import { Logo } from "@/components/core/logo";
import { Navs } from "@/domains/dashboard/composites/navs";
import { Topbar } from "@/domains/dashboard/composites/topbar";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof Topbar> {
  pathname: string;
}

export function NavBar({ className, children, pathname, ...props }: Props) {
  return (
    <Topbar
      className={cn("h-16 w-full justify-start gap-6", className)}
      {...props}
    >
      <Logo className="[&_svg:not([class*='size-'])]:size-8" />
      <Navs pathname={pathname} />
      {children}
    </Topbar>
  );
}
