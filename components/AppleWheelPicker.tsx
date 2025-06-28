import { cn } from "./ui/utils";

interface AppleWheelPickerProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function AppleWheelPicker({ 
  options, 
  selected, 
  onSelect, 
  className 
}: AppleWheelPickerProps) {
  const centerIndex = Math.floor(options.length / 2);

  return (
    <div className={cn("relative w-[140px] h-[200px] overflow-hidden", className)}>
      {/* Options */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {options.map((option, index) => {
          const offset = (index - centerIndex) * 44; // 44px per item
          const distance = Math.abs(index - centerIndex);
          const opacity = distance === 0 ? 1 : Math.max(0.3, 1 - distance * 0.2);
          
          return (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className={cn(
                "absolute h-[44px] w-[140px] flex items-center justify-center transition-all duration-300",
                "text-[12px] text-white/60 hover:text-white"
              )}
              style={{ 
                transform: `translateY(${offset}px)`,
                opacity: opacity
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}