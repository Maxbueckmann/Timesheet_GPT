import { cn } from "./ui/utils";

interface PickerColumnProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function PickerColumn({ 
  options, 
  selected, 
  onSelect, 
  className 
}: PickerColumnProps) {
  return (
    <div className={cn("flex flex-col gap-3 min-w-[140px]", className)}>
      {options.map((option) => {
        const isSelected = option === selected;
        
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              "h-[44px] px-4 py-2 rounded transition-all duration-200",
              "flex items-center justify-center text-[12px]",
              isSelected 
                ? "bg-[#5bc47b] text-white" 
                : "bg-[#2a2a2a] text-white/60 hover:text-white hover:bg-[#3a3a3a]"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}