import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-offset-2 active:translate-y-0.5 active:shadow-[0_1px_4px_rgba(0,0,0,0.2)]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-[#388E3C] to-[#2E7D32] text-white border-b-4 border-[#1B5E20] shadow-[0_4px_0_#1B5E20,0_6px_12px_rgba(0,0,0,0.2)] hover:from-[#43A047] hover:to-[#388E3C] focus-visible:ring-[#2E7D32]/40",
        destructive:
          "bg-gradient-to-b from-[#E53935] to-[#c62828] text-white border-b-4 border-[#B71C1C] shadow-[0_4px_0_#B71C1C,0_6px_12px_rgba(0,0,0,0.2)] hover:from-[#EF5350] hover:to-[#E53935] focus-visible:ring-[#c62828]/40",
        outline:
          "border-2 bg-white text-gray-900 border-gray-300 shadow-[0_2px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.08)] hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-400/40",
        secondary:
          "bg-gradient-to-b from-white to-[#f5f5f5] text-gray-900 border-b-4 border-gray-300 shadow-[0_4px_0_#d1d1d1,0_6px_12px_rgba(0,0,0,0.15)] hover:from-[#fafafa] hover:to-white focus-visible:ring-gray-400/40",
        ghost:
          "hover:bg-white/10 text-white shadow-none border-none hover:shadow-none focus-visible:ring-white/20 active:translate-y-0 active:shadow-none",
        link: "text-gray-900 underline-offset-4 hover:underline shadow-none border-none hover:shadow-none focus-visible:ring-gray-400/40 active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-4 min-w-[44px]",
        sm: "h-10 px-4 py-2 has-[>svg]:px-3 text-sm min-w-[40px]",
        lg: "h-12 px-8 py-3 has-[>svg]:px-6 text-base min-w-[48px]",
        icon: "size-11 min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };