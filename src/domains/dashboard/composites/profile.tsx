import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof Avatar> {
  src: string | undefined;
}

export function ProfileDropdown({ src, ...props }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar {...props}>
          <AvatarImage src={src} />
          <AvatarFallback />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Display */}
        {/* Organization */}
        {/* Accounts */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
