import { cn } from "@/core/lib/cn";
import { buttonVariants } from "@/core/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/core/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export function Notification({
  className,
  ...props
}: ComponentPropsWithRef<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          className,
        )}
        {...props}
      >
        <span className="sr-only">Notification Trigger</span>
        <BellIcon />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
