import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { authClient } from "@/lib/auth-client";
import type { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<typeof Avatar> &
  typeof authClient.$Infer.Session & {};

export function UserAvatar({ user, ...props }: Props) {
  return (
    <Avatar {...props}>
      <AvatarImage
        alt="profile"
        src={user.image ?? ""}
      />
      <AvatarFallback className="border">{user.name[0]}</AvatarFallback>
    </Avatar>
  );
}
