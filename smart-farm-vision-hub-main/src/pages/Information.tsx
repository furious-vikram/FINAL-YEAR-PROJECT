import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sprout, Clock, Users, Search, BookOpen, Leaf, Sun, Droplets } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CropGuide {
  id: string;
  title: string;
  content: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  season: string;
  climate_suitability: string;
  growth_duration: string;
  media_url?: string;
  crop_categories: {
    name: string;
  };
}

export default function Information() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [guides, setGuides] = useState<CropGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    fetchGuides();
    fetchCategories();
  }, [user]);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('crop_guides')
        .select(`
          *,
          crop_categories (
            name
          )
        `);

      // If user is not a farmer or admin, only show public guides
      if (!profile || (profile.role !== 'farmer' && profile.role !== 'admin')) {
        query = query.eq('is_public', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching guides:', error);
        toast({
          title: "Error",
          description: "Failed to load crop guides.",
          variant: "destructive",
        });
        return;
      }

      setGuides(data as CropGuide[] || []);
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

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === 'all' || guide.difficulty_level === difficultyFilter;
    
    const matchesCategory = categoryFilter === 'all' || 
                           guide.crop_categories?.name === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'beginner': return <Sprout className="h-4 w-4" />;
      case 'intermediate': return <Leaf className="h-4 w-4" />;
      case 'advanced': return <Sun className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading crop guides...</p>
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
            Learn to Grow with Smart Agriculture
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover comprehensive guides, expert tips, and best practices for sustainable farming. 
            Perfect for new farmers and experienced growers alike.
          </p>
          
          {!user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800">
                <BookOpen className="inline h-4 w-4 mr-2" />
                Sign up as a farmer to access our complete library of advanced growing guides!
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
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
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{guides.length}</div>
              <div className="text-sm text-muted-foreground">Total Guides</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {guides.filter(g => g.difficulty_level === 'beginner').length}
              </div>
              <div className="text-sm text-muted-foreground">Beginner Friendly</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Sprout className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Access</div>
            </CardContent>
          </Card>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No guides found</h3>
              <p className="text-muted-foreground">
                {searchTerm || difficultyFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your search filters.'
                  : 'Check back later for new crop guides.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg line-clamp-2 flex-1">
                      {guide.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(guide.difficulty_level)}>
                      {getDifficultyIcon(guide.difficulty_level)}
                      <span className="ml-1 capitalize">{guide.difficulty_level}</span>
                    </Badge>
                    {guide.crop_categories && (
                      <Badge variant="outline">
                        {guide.crop_categories.name}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="line-clamp-3 mb-4 flex-1">
                    {guide.content.substring(0, 150)}...
                  </CardDescription>
                  
                  <div className="space-y-2 mb-4">
                    {guide.season && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Season: {guide.season}</span>
                      </div>
                    )}
                    {guide.growth_duration && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Duration: {guide.growth_duration}</span>
                      </div>
                    )}
                    {guide.climate_suitability && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Droplets className="h-4 w-4 mr-2 text-green-500" />
                        <span>Climate: {guide.climate_suitability}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Read Full Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}