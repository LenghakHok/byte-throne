import { cn } from "@/core/lib/cn";
import type { ComponentPropsWithRef } from "react";

export function Kbd({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"kbd">) {
  return (
    <kbd
      className={cn(
        "rounded-sm border border-b-2 bg-card p-1.5 py-0.5 text-muted-foreground text-xs shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
