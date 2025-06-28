import { cn } from "./ui/utils";

interface AppleStylePickerProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function AppleStylePicker({ 
  options, 
  selected, 
  onSelect, 
  className 
}: AppleStylePickerProps) {
  const selectedIndex = selected ? options.indexOf(selected) : -1;
  
  return (
    <div className={cn("relative min-w-[180px]", className)}>
      {options.map((option, index) => {
        const isSelected = option === selected;
        const offset = (index - selectedIndex) * 73; // 54px height + 19px gap
        
        return (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={cn(
              "absolute h-[54px] w-[180px] rounded transition-all duration-300",
              "flex items-center justify-center px-4 py-2",
              "border border-[rgba(255,255,255,0.1)]",
              isSelected 
                ? "bg-[#5bc47b] text-white z-10" 
                : "bg-[#121212] text-white/60 hover:text-white hover:bg-[#1a1a1a] z-0"
            )}
            style={{ 
              top: isSelected ? 0 : offset,
              transform: isSelected ? 'none' : `translateY(${offset}px)`
            }}
          >
            <span className="text-[12px] font-normal leading-[1.5] text-center">
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}