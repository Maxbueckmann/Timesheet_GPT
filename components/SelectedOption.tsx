import { cn } from "./ui/utils";

interface SelectedOptionProps {
  value: string;
  isComment?: boolean;
  className?: string;
}

export function SelectedOption({ value, isComment = false, className }: SelectedOptionProps) {
  if (isComment) {
    return (
      <div className={cn(
        "h-[63px] relative rounded-lg w-[219px]",
        "border-[0.5px] border-[rgba(255,255,255,0.5)] border-solid",
        className
      )}>
        <div className="box-border content-stretch flex flex-row gap-2.5 h-[63px] items-start justify-start p-[10px] relative w-[219px]">
          <div className="flex flex-col font-['Lexend:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[11px] text-[rgba(255,255,255,0.5)] text-left text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">
              {value}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-[#5bc47b] h-[54px] relative rounded w-[180px]",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">{value}</p>
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}