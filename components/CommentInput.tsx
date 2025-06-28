import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "./ui/utils";

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  required?: boolean;
  className?: string;
}

export function CommentInput({ 
  value, 
  onChange, 
  placeholder = "What are you gonna do?",
  suggestions = [],
  required = false,
  className 
}: CommentInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className={cn("flex flex-col min-w-[180px] flex-shrink-0", className)}>
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs text-white/60 uppercase tracking-wide">
          Comment {required && <span className="text-[#5bc47b]">*</span>}
        </h3>
      </div>
      
      {/* Input area */}
      <div className="max-h-[240px] overflow-y-auto pr-2">
        <div className="h-[88px] w-[180px] rounded border border-[rgba(255,255,255,0.1)] bg-[#121212] p-3 flex items-start">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[60px] w-full resize-none bg-transparent border-none text-[12px] text-white placeholder:text-white/60 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="mt-2 border border-[rgba(255,255,255,0.1)] rounded bg-[#121212] max-h-[120px] overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full px-3 py-2 text-left text-[12px] text-white/60 hover:text-white hover:bg-[#1a1a1a] border-b border-[rgba(255,255,255,0.1)] last:border-b-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}