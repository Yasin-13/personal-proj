import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-amber-200",  // Amber background for the skeleton
        className
      )}
      {...props} 
    />
  );
}

export { Skeleton };
