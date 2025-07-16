import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sprout, MapPin, ShoppingCart, Search, User, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Crop {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  location: string;
  image_url?: string;
  farmer_id: string;
  crop_categories: {
    name: string;
  };
  profiles: {
    name: string;
  };
}

export default function Marketplace() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    fetchCrops();
    fetchCategories();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('crops')
        .select(`
          *,
          crop_categories (
            name
          ),
          profiles (
            name
          )
        `)
        .gt('quantity', 0)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching crops:', error);
        toast({
          title: "Error",
          description: "Failed to load crops.",
          variant: "destructive",
        });
        return;
      }

      setCrops(data as Crop[] || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('crop_categories')
        .select('id, name')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addToCart = async (cropId: string, quantity: number = 1) => {
    if (!user || !profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    if (profile.role !== 'customer') {
      toast({
        title: "Access denied",
        description: "Only customers can add items to cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('cart')
        .upsert({
          customer_id: user.id,
          crop_id: cropId,
          quantity
        }, {
          onConflict: 'customer_id,crop_id'
        });

      if (error) {
        console.error('Error adding to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Added to cart!",
        description: "Item has been added to your cart.",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || 
                           crop.crop_categories?.name === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading marketplace...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Fresh Crop Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover fresh, locally grown crops directly from farmers. 
            Support sustainable agriculture and get the best quality produce.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search crops, location, or farmer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Sprout className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{crops.length}</div>
              <div className="text-sm text-muted-foreground">Available Crops</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {new Set(crops.map(c => c.farmer_id)).size}
              </div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {new Set(crops.map(c => c.location).filter(Boolean)).size}
              </div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </Card>
        </div>

        {/* Crops Grid */}
        {filteredCrops.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Sprout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No crops found</h3>
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== 'all'
                  ? 'Try adjusting your search filters.'
                  : 'Check back later for new crops.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <Card key={crop.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg line-clamp-2 flex-1">
                      {crop.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-lg font-bold">
                      ${crop.price}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {crop.crop_categories && (
                      <Badge variant="outline">
                        {crop.crop_categories.name}
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      {crop.quantity} available
                    </Badge>
                  </div>
                </CardHeader>
                
                {crop.image_url && (
                  <div className="px-6">
                    <img 
                      src={crop.image_url} 
                      alt={crop.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <CardContent className="flex-1 flex flex-col">
                  {crop.description && (
                    <CardDescription className="line-clamp-3 mb-4 flex-1">
                      {crop.description}
                    </CardDescription>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2 text-green-500" />
                      <span>Farmer: {crop.profiles?.name || 'Unknown'}</span>
                    </div>
                    {crop.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{crop.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => addToCart(crop.id)}
                      disabled={!user || profile?.role !== 'customer'}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                  
                  {!user && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Sign in as a customer to purchase
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}