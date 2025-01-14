import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white hover:bg-gradient-to-r hover:from-amber-600 hover:via-amber-700 hover:to-yellow-700",
        secondary:
          "border-transparent bg-amber-200 text-amber-800 hover:bg-amber-300 text-semibold",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        outline:
          "border-amber-500 text-amber-500 border-2 hover:bg-amber-100 text-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }
