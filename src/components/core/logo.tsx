import { BrandIconDark, BrandIconLight } from "@/components/icons/brand";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
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
