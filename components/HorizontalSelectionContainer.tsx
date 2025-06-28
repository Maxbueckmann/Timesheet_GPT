import { cn } from "./ui/utils";
import { ReactNode } from "react";

interface HorizontalSelectionContainerProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalSelectionContainer({ children, className }: HorizontalSelectionContainerProps) {
  return (
    <div 
      className={cn(
        "bg-[#242424] rounded-xl px-[21px] py-[15px] transition-all duration-500 ease-out",
        "flex gap-[57px] items-center justify-start min-h-[78px]",
        className
      )}
    >
      {children}
    </div>
  );
}