import { H1, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithRef } from "react";

export function Header({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeaderTitle({
  children,
  className,
  ...props
}: ComponentPropsWithRef<typeof H1>) {
  return (
    <H1
      className={cn("text-2xl lg:text-3xl", className)}
      {...props}
    >
      {children}
    </H1>
  );
}

export function HeaderDescription({
  children,
  className,
  ...props
}: ComponentPropsWithRef<typeof Muted>) {
  return (
    <Muted
      className={cn(className)}
      {...props}
    >
      {children}
    </Muted>
  );
}
