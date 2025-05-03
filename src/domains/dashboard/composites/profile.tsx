import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/domains/dashboard/components/user";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof UserAvatar> {}

export function ProfileDropdown({ session, user, ...props }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          session={session}
          user={user}
          {...props}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Display */}
        {/* Organization */}
        {/* Accounts */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
