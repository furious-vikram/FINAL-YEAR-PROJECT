import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Sprout, User, ShoppingCart, Warehouse, BookOpen, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  const getRoleBasedLinks = () => {
    if (!profile) return [];

    const commonLinks = [
      { href: '/information', label: 'Information', icon: BookOpen }
    ];

    switch (profile.role) {
      case 'farmer':
        return [
          { href: '/farmer/dashboard', label: 'Dashboard', icon: User },
          { href: '/farmer/crops', label: 'My Crops', icon: Sprout },
          { href: '/farmer/orders', label: 'Orders', icon: ShoppingCart },
          { href: '/farmer/storage', label: 'Storage', icon: Warehouse },
          ...commonLinks
        ];
      case 'customer':
        return [
          { href: '/customer/dashboard', label: 'Dashboard', icon: User },
          { href: '/marketplace', label: 'Marketplace', icon: Sprout },
          { href: '/customer/cart', label: 'Cart', icon: ShoppingCart },
          { href: '/customer/orders', label: 'Orders', icon: ShoppingCart },
          ...commonLinks
        ];
      case 'admin':
        return [
          { href: '/admin/dashboard', label: 'Admin', icon: User },
          { href: '/admin/users', label: 'Users', icon: User },
          { href: '/admin/warehouse', label: 'Warehouse', icon: Warehouse },
          { href: '/admin/guides', label: 'Manage Guides', icon: BookOpen },
          ...commonLinks
        ];
      default:
        return commonLinks;
    }
  };

  const roleLinks = getRoleBasedLinks();

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Smart Agriculture</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
              Marketplace
            </Link>
            <Link to="/information" className="text-muted-foreground hover:text-foreground transition-colors">
              Information
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {profile?.name}
                </span>
                {profile?.role && (
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full capitalize">
                    {profile.role}
                  </span>
                )}
                
                {/* Role-based navigation */}
                {roleLinks.slice(0, 3).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/marketplace"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/information"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Information
            </Link>
            
            {user ? (
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Welcome, {profile?.name}
                  {profile?.role && (
                    <span className="ml-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full capitalize">
                      {profile.role}
                    </span>
                  )}
                </div>
                
                {roleLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-border">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};