import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "rose" | "green" | "red" | "blue" | "gray";
}

export default function Badge({
  children,
  variant = "gray",
  className,
  ...props
}: BadgeProps) {
  const variants = {
    gold:  "bg-gold-400/15 text-gold-300 border border-gold-400/25",
    rose:  "bg-rose-salon/15 text-rose-salon-light border border-rose-salon/25",
    green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    red:   "bg-red-500/15 text-red-400 border border-red-500/25",
    blue:  "bg-blue-500/15 text-blue-400 border border-blue-500/25",
    gray:  "bg-white/5 text-white/60 border border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
