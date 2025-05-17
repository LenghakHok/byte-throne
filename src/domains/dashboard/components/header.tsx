import { cn } from "@/core/lib/cn";
import { H1, Muted } from "@/core/ui/typography";
import type { ComponentPropsWithRef } from "react";

export function DashboardHeader({
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

export function DashboardHeaderTitle({
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

export function DashboardHeaderDescription({
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
