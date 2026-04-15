import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  full?: boolean;
}

export default function Button({
  children,
  variant = "gold",
  size = "md",
  full = false,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    gold: "bg-gold-400 hover:bg-gold-300 text-onyx hover:shadow-lg hover:shadow-gold-400/30 hover:scale-[1.03]",
    ghost: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20",
    outline: "border border-gold-400/40 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], full && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
