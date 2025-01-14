import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white hover:from-amber-600 hover:via-amber-700 hover:to-yellow-600",
        destructive: 
          "bg-red-600 text-white hover:bg-red-700",
        outline: 
          "border-amber-500 bg-transparent text-amber-500 hover:bg-amber-100 hover:text-amber-800",
        secondary: 
          "bg-amber-200 text-amber-800 hover:bg-amber-300 text-semibold",
        ghost: 
          "hover:bg-amber-100 hover:text-amber-800",
        link: 
          "text-amber-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} 
    />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
