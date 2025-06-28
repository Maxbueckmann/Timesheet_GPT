import { cn } from "./ui/utils";
import { ReactNode } from "react";

interface HorizontalContainerProps {
  children: ReactNode;
  columns: number;
  className?: string;
}

export function HorizontalContainer({ children, columns, className }: HorizontalContainerProps) {
  // Base width starts with one column, grows with each additional column
  const baseWidth = 220;
  const additionalWidth = 200;
  const totalWidth = baseWidth + (columns - 1) * additionalWidth;

  return (
    <div 
      className={cn(
        "bg-[#242424] rounded-xl p-5 transition-all duration-500 ease-out",
        "flex gap-6 items-start min-h-[320px] max-w-full overflow-x-auto",
        className
      )}
    >
      {children}
    </div>
  );
}