import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        
        <p className="text-muted-foreground flex-grow">{description}</p>
        
        <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-300 mx-auto rounded-full"></div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;