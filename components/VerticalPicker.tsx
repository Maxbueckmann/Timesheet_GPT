import { cn } from "./ui/utils";
import { useEffect, useRef } from "react";

interface VerticalPickerProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  label: string;
  className?: string;
}

export function VerticalPicker({ 
  options, 
  selected, 
  onSelect, 
  label, 
  className 
}: VerticalPickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected && selectedItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedElement = selectedItemRef.current;
      
      const containerHeight = container.clientHeight;
      const itemHeight = selectedElement.clientHeight;
      const selectedTop = selectedElement.offsetTop;
      
      // Calculate the scroll position to center the selected item
      const scrollTop = selectedTop - (containerHeight / 2) + (itemHeight / 2);
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, [selected]);

  // Add padding items to allow centering of first and last items
  const paddingCount = Math.floor(5 / 2); // 5 visible items, so 2 padding items top and bottom
  const paddedOptions = [
    ...Array(paddingCount).fill(''),
    ...options,
    ...Array(paddingCount).fill('')
  ];

  return (
    <div className={cn("flex flex-col w-[160px] bg-card rounded-lg border border-border/50 relative", className)}>
      <div className="px-3 py-2 border-b border-border/30">
        <h3 className="text-xs text-muted-foreground uppercase tracking-wide">{label}</h3>
      </div>
      <div className="relative">
        {/* Center line indicator */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-[1px] bg-primary/30 z-10 pointer-events-none" />
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-[40px] bg-primary/5 z-0 pointer-events-none rounded" />
        
        <div 
          ref={scrollContainerRef}
          className="flex-1 h-[200px] overflow-y-auto overflow-x-hidden scrollbar-hide relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {paddedOptions.map((option, index) => {
            const isRealOption = index >= paddingCount && index < paddedOptions.length - paddingCount;
            const realIndex = index - paddingCount;
            const isSelected = isRealOption && options[realIndex] === selected;
            
            return (
              <button
                key={index}
                ref={isSelected ? selectedItemRef : null}
                onClick={() => isRealOption && onSelect(options[realIndex])}
                disabled={!isRealOption}
                className={cn(
                  "w-full h-[40px] px-3 text-left text-sm transition-all duration-200 flex items-center",
                  !isRealOption && "cursor-default",
                  isRealOption && "hover:bg-accent/20",
                  isSelected 
                    ? "text-primary font-medium relative z-20" 
                    : isRealOption 
                    ? "text-foreground" 
                    : "text-transparent"
                )}
              >
                {isRealOption ? options[realIndex] : ''}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}