import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";
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
