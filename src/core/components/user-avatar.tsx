import type { authClient } from "@/core/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof Avatar> {
  user: Partial<typeof authClient.$Infer.Session.user>;
}

export function UserAvatar({ user, ...props }: Props) {
  return (
    <Avatar {...props}>
      <AvatarImage
        alt="profile"
        src={user.image ?? ""}
      />
      <AvatarFallback className="border">{user?.name?.[0]}</AvatarFallback>
    </Avatar>
  );
}
