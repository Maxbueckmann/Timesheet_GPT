import { cn } from "./ui/utils";
import { Play, Send, Clock } from "lucide-react";

interface StatusCircleProps {
  status: 'select' | 'next' | 'comment' | 'ready' | 'complete';
  message: string;
  onClick?: () => void;
  canProceed: boolean;
}

export function StatusCircle({ status, message, onClick, canProceed }: StatusCircleProps) {
  const getIcon = () => {
    switch (status) {
      case 'ready':
        return <Play className="w-10 h-10" />;
      case 'complete':
        return <Send className="w-10 h-10" />;
      default:
        return <Clock className="w-8 h-8" />;
    }
  };

  const isActionable = status === 'ready' || status === 'complete';

  return (
    <div className="flex flex-col items-center justify-center min-w-[240px]">
      <button
        onClick={onClick}
        disabled={!canProceed || !isActionable}
        className={cn(
          "w-44 h-44 rounded-full transition-all duration-300",
          "flex flex-col items-center justify-center gap-3",
          "hover:scale-105 active:scale-95",
          "border-2",
          canProceed && isActionable 
            ? "bg-primary border-primary text-primary-foreground cursor-pointer hover:bg-primary/90" 
            : canProceed 
            ? "bg-muted border-muted-foreground/20 text-foreground cursor-default"
            : "bg-muted/50 border-muted-foreground/10 text-muted-foreground cursor-default"
        )}
      >
        {getIcon()}
      </button>
      <p className="mt-6 text-center text-sm text-muted-foreground max-w-[200px] leading-relaxed">
        {message}
      </p>
    </div>
  );
}