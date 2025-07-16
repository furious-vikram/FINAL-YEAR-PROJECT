import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  quote: string;
  role: string;
  avatar?: string;
  company?: string;
}

const TestimonialCard = ({ name, quote, role, avatar, company }: TestimonialCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <Quote className="h-8 w-8 text-primary/30 mr-2 flex-shrink-0" />
          <blockquote className="text-lg text-foreground italic">
            "{quote}"
          </blockquote>
        </div>
        
        <div className="flex items-center mt-6">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-sm text-muted-foreground">
              {role}
              {company && (
                <>
                  {" at "}
                  <span className="text-primary font-medium">{company}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Rating Stars */}
        <div className="flex items-center mt-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;