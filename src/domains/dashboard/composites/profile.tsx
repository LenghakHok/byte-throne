import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/domains/dashboard/components/user";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof UserAvatar> {}

export function ProfileDropdown({ session, user, ...props }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "rounded-full",
        )}
      >
        <UserAvatar
          session={session}
          user={user}
          {...props}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Display */}
        {/* Organization */}
        {/* Accounts */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
