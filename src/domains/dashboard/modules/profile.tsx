import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Muted } from "@/components/ui/typography";
import { UserAvatar } from "@/domains/dashboard/components/user";
import { cn } from "@/lib/cn";
import {
  ActivityIcon,
  BadgeHelpIcon,
  BadgePlusIcon,
  BugIcon,
  LogOutIcon,
  MessageSquareMoreIcon,
  SettingsIcon,
  UserCogIcon,
  UserPlusIcon,
} from "lucide-react";
import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

export function ProfileDropdown({
  session,
  user,
  ...props
}: ComponentPropsWithRef<typeof UserAvatar>) {
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
      <DropdownMenuContent
        align="end"
        className="min-w-xs"
      >
        <DropdownMenuGroup>
          <div className="justify-end-safe flex flex-col items-center gap-4 p-2">
            <ProfileDisplay
              className="w-full"
              session={session}
              user={user}
            />

            <div className="justify-end-safe flex w-full flex-row items-center gap-2">
              <DropdownMenuItem className="w-full justify-center rounded-full border shadow-xs">
                <UserPlusIcon />
                <span>Add Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="w-full justify-center rounded-full border shadow-xs">
                <LogOutIcon />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </div>
          </div>
        </DropdownMenuGroup>
        {/* Organization */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-widest">
            Organization
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <BadgePlusIcon />
            <span>Create an Organization</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Accounts */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-widest">
            Account
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <UserCogIcon />
            <span>Manage Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ActivityIcon />
            <span>Activity</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Accounts */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-widest">
            Support
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <BadgeHelpIcon />
            <span>Help & Supports</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquareMoreIcon />
            <span>FAQs</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BugIcon />
            <span>Bug Reports</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileDisplay({
  className,
  session,
  user,
  ...props
}: ComponentPropsWithRef<"div"> & ComponentPropsWithoutRef<typeof UserAvatar>) {
  return (
    <div
      className={cn("flex items-center justify-start gap-4", className)}
      {...props}
    >
      <UserAvatar
        className="size-10"
        session={session}
        user={user}
      />

      <div className="flex w-fit flex-col items-start justify-center">
        <span className="font-bold">{user.name}</span>
        <Muted>{user.email}</Muted>
      </div>
    </div>
  );
}
