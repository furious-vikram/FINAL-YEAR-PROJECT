import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Smart Agriculture</h3>
            <p className="text-background/80">
              Revolutionizing farming with cutting-edge IoT technology and data analytics.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              <a href="/about" className="block text-background/80 hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/features" className="block text-background/80 hover:text-primary transition-colors">
                Features
              </a>
              <a href="/pricing" className="block text-background/80 hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="/courses" className="block text-background/80 hover:text-primary transition-colors">
                Courses
              </a>
              <a href="/support" className="block text-background/80 hover:text-primary transition-colors">
                Support
              </a>
            </nav>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <nav className="space-y-2">
              <a href="/documentation" className="block text-background/80 hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="/tutorials" className="block text-background/80 hover:text-primary transition-colors">
                Tutorials
              </a>
              <a href="/blog" className="block text-background/80 hover:text-primary transition-colors">
                Blog
              </a>
              <a href="/case-studies" className="block text-background/80 hover:text-primary transition-colors">
                Case Studies
              </a>
              <a href="/community" className="block text-background/80 hover:text-primary transition-colors">
                Community
              </a>
            </nav>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-background/80">
                <Mail className="h-4 w-4" />
                <span>info@smartagriculture.com</span>
              </div>
              <div className="flex items-center space-x-2 text-background/80">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-background/80">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 Smart Agriculture. All rights reserved.
          </p>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-background/60 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-background/60 hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-background/60 hover:text-primary text-sm transition-colors">
              Cookie Policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;