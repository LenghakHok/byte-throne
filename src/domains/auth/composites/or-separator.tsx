import { cn } from "@/core/lib/cn";
import { Separator } from "@/core/ui/separator";
import { Muted } from "@/core/ui/typography";
import type { ComponentPropsWithRef } from "react";

export function OrSeparator({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[1fr_auto_1fr] grid-rows-1 items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      <Separator orientation="horizontal" />
      <Muted className="font-bold">OR</Muted>
      <Separator orientation="horizontal" />
    </div>
  );
}
