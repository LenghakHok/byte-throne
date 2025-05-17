import { BrandIconDark, BrandIconLight } from "@/core/icons/brand";
import { cn } from "@/core/lib/cn";
import { buttonVariants } from "@/core/ui/button";
import type { ComponentPropsWithRef } from "react";

export function Logo({ className, ...props }: ComponentPropsWithRef<"a">) {
  return (
    <a
      className={cn(
        buttonVariants({ size: "icon", variant: "ghost" }),
        "size-fit rounded-full p-3 [&_svg:not([class*='size-'])]:size-12",
        className,
      )}
      href="/"
      {...props}
    >
      <BrandIconDark className="hidden dark:block" />
      <BrandIconLight className="block dark:hidden" />
      <span className="sr-only"> Logo </span>
    </a>
  );
}
