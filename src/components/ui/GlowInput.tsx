import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface GlowInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const GlowInput = forwardRef<HTMLInputElement, GlowInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
            "transition-all duration-300",
            error && "border-destructive focus:border-destructive focus:shadow-[0_0_20px_hsl(var(--destructive)/0.3)]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

GlowInput.displayName = "GlowInput";
