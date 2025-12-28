import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "google";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "relative overflow-hidden font-display font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
    
    const variants = {
      primary: "glow-button text-primary-foreground",
      secondary: "bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30 hover:shadow-[0_0_30px_hsl(var(--secondary)/0.4)]",
      ghost: "bg-transparent text-foreground border border-border hover:bg-muted hover:border-primary/50",
      google: "bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

GlowButton.displayName = "GlowButton";
