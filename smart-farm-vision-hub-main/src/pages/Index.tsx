import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import HowItWorksStep from "@/components/HowItWorksStep";
import VideoPlayer from "@/components/VideoPlayer";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Droplets, 
  BarChart3, 
  Cloud, 
  Wifi, 
  Monitor, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

const features = [
  {
    Icon: Thermometer,
    title: "Real-time Sensor Data",
    description: "Monitor temperature, humidity, and soil moisture in real time with precision IoT sensors."
  },
  {
    Icon: Droplets,
    title: "Automated Irrigation",
    description: "Control irrigation systems with intelligent automation based on real-time data and weather forecasts."
  },
  {
    Icon: BarChart3,
    title: "Data Analytics",
    description: "Analyze crop health patterns and optimize yields with AI-powered insights and predictions."
  },
  {
    Icon: Cloud,
    title: "Weather Integration",
    description: "Get accurate weather forecasts and alerts to make informed farming decisions and protect crops."
  }
];

const steps = [
  {
    step: 1,
    title: "Connect Sensors",
    description: "Install IoT sensors across your farm to monitor environmental conditions 24/7.",
    Icon: Wifi
  },
  {
    step: 2,
    title: "Monitor Data",
    description: "View real-time data and insights through our intuitive dashboard interface.",
    Icon: Monitor
  },
  {
    step: 3,
    title: "Optimize Farming",
    description: "Use analytics and automation to improve yields and reduce resource waste.",
    Icon: TrendingUp
  }
];

const testimonials = [
  {
    name: "John Anderson",
    quote: "Smart Agriculture transformed my 500-acre farm. Crop yields increased by 35% in just one season!",
    role: "Farm Owner",
    company: "Anderson Farms"
  },
  {
    name: "Sarah Martinez",
    quote: "The real-time monitoring helped us prevent crop loss during the drought. Absolutely game-changing!",
    role: "Agricultural Consultant",
    company: "GreenTech Solutions"
  },
  {
    name: "Michael Chen",
    quote: "The automation features saved us 20 hours per week. Now we can focus on strategy instead of manual tasks.",
    role: "Operations Manager",
    company: "Valley Organic Co."
  },
  {
    name: "Emma Rodriguez",
    quote: "The courses taught us modern farming techniques. Our ROI improved by 40% within 6 months.",
    role: "Agronomist",
    company: "Sustainable Harvests"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need to transform your agricultural operations with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-nature-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started with Smart Agriculture in three simple steps and begin optimizing your farm operations today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <HowItWorksStep 
                key={index} 
                {...step} 
                isLast={index === steps.length - 1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Discover Smart Agriculture in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch our comprehensive demo to see how our platform and educational courses can transform your farming operations and boost your productivity.
            </p>
          </div>
          
          <div className="mb-8">
            <VideoPlayer 
              title="Smart Agriculture Platform Demo - Transforming Modern Farming"
            />
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold mr-4">
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
              Watch More Tutorials
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of farmers who have transformed their operations with Smart Agriculture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Smart Farming Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers already using Smart Agriculture to increase yields, reduce costs, and build sustainable farming operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold">
              Schedule a Demo
            </Button>
          </div>
          
          <p className="text-sm mt-6 opacity-75">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
