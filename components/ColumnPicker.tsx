import { cn } from "./ui/utils";

interface ColumnPickerProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  label: string;
  className?: string;
}

export function ColumnPicker({ 
  options, 
  selected, 
  onSelect, 
  label, 
  className 
}: ColumnPickerProps) {
  return (
    <div className={cn("flex flex-col min-w-[180px] flex-shrink-0", className)}>
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs text-white/60 uppercase tracking-wide">{label}</h3>
      </div>
      
      {/* Scrollable options */}
      <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={cn(
              "h-[44px] w-[180px] rounded transition-all duration-200",
              "flex items-center justify-center px-4 py-2",
              "border border-[rgba(255,255,255,0.1)] flex-shrink-0",
              selected === option 
                ? "bg-[#5bc47b] text-white" 
                : "bg-[#121212] text-white/60 hover:text-white hover:bg-[#1a1a1a]"
            )}
          >
            <span className="text-[12px] font-normal leading-[1.5] text-center">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}