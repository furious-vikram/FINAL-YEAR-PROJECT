import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  step: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  isLast?: boolean;
}

const HowItWorksStep = ({ step, title, description, Icon, isLast }: HowItWorksStepProps) => {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Step Number */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
        {step}
      </div>
      
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0 transform translate-x-8"></div>
      )}
      
      {/* Icon */}
      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-xs">{description}</p>
    </div>
  );
};

export default HowItWorksStep;