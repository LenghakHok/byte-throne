import { Logo } from "@/core/components/logo";
import { cn } from "@/core/lib/cn";
import { Navs } from "@/domains/dashboard/composites/navs";
import { Topbar } from "@/domains/dashboard/composites/topbar";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof Topbar> {
  pathname: string;
}

export function NavBar({ className, children, pathname, ...props }: Props) {
  return (
    <Topbar
      className={cn("h-16 w-full justify-start md:gap-6", className)}
      {...props}
    >
      <Logo className="[&_svg:not([class*='size-'])]:size-8" />
      <Navs
        className="hidden lg:flex"
        pathname={pathname}
      />
      {children}
    </Topbar>
  );
}
