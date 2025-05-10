// UI Components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Muted } from "@/components/ui/typography";
import { UserAvatar } from "@/domains/dashboard/components/user-avatar";

// Icons
import {
  ActivityIcon,
  BadgeHelpIcon,
  BugIcon,
  BuildingIcon,
  LogOutIcon,
  MessageSquareMoreIcon,
  PlusIcon,
  SettingsIcon,
  Undo2Icon,
  UserCogIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";

// Utils & Hooks
import { cn } from "@/lib/cn";
import { For } from "@/utils/for";
import { If } from "@/utils/if";
import { useCallback, type ComponentPropsWithRef } from "react";

// Services & State
import { createOrgDialog$ } from "@/domains/org/stores/org-store";
import { authClient } from "@/lib/auth-client";
import { useSetActiveOrg } from "@/services/org/hooks";

// Types
interface UserAvatarProps extends ComponentPropsWithRef<typeof UserAvatar> {}

// Component: ProfileDisplay - Shows user avatar and info
export function ProfileDisplay({
  className,
  session,
  user,
  ...props
}: ComponentPropsWithRef<"div"> & UserAvatarProps) {
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

// Component: OrganizationList - Shows list of organizations in dropdown
export function OrganizationList(
  props: ComponentPropsWithRef<typeof DropdownMenuSub>,
) {
  const { data: list } = authClient.useListOrganizations();
  const { data: active } = authClient.useActiveOrganization();
  const { mutate: setActiveOrg } = useSetActiveOrg();

  if (!list || list.length === 0) {
    return null;
  }

  return (
    <DropdownMenuSub {...props}>
      <DropdownMenuSubTrigger className="w-full gap-3">
        <If isTrue={Boolean(active?.id)}>
          <Avatar>
            <AvatarFallback className="uppercase">
              {active?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span>{active?.name}</span>
        </If>

        <If isTrue={!active?.id}>
          <UserIcon className="size-4 text-muted-foreground" />
          <span>Personal Workspace</span>
        </If>
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className="min-w-52">
        <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-widest">
          Organizations
        </DropdownMenuLabel>

        <For
          each={list}
          render={(org) => (
            <DropdownMenuItem
              className="gap-4"
              key={org.id}
              onClick={() => setActiveOrg({ organizationId: org.id })}
            >
              <Avatar className="size-8">
                <AvatarFallback className="uppercase">
                  {org.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <span>{org.name}</span>

              <If isTrue={org.id === active?.id}>
                <Badge className="ml-auto w-fit">Active</Badge>
              </If>
            </DropdownMenuItem>
          )}
        />

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-3"
          onClick={() =>
            setActiveOrg({
              organizationId: null,
            })
          }
        >
          <Undo2Icon className="size-4 text-muted-foreground" />
          <span>Switch to Personal</span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

// Component Sections for ProfileDropdown
const AccountSection = () => (
  <>
    <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-widest">
      Account
    </DropdownMenuLabel>
    <DropdownMenuItem className="gap-3">
      <UserCogIcon />
      <span>Profile</span>
    </DropdownMenuItem>
    <DropdownMenuItem className="gap-3">
      <ActivityIcon />
      <span>Activity</span>
    </DropdownMenuItem>
    <DropdownMenuItem className="gap-3">
      <SettingsIcon />
      <span>Settings</span>
    </DropdownMenuItem>
  </>
);

const OrganizationSection = () => (
  <>
    <DropdownMenuItem className="gap-3">
      <BuildingIcon />
      <span>Manage Organization</span>
    </DropdownMenuItem>

    <DropdownMenuItem
      className="gap-3"
      onClick={() => createOrgDialog$.isOpen.set(true)}
    >
      <PlusIcon />
      <span>Create an Organization</span>
    </DropdownMenuItem>
  </>
);

const SupportSection = () => (
  <>
    <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-widest">
      Support
    </DropdownMenuLabel>
    <DropdownMenuItem className="gap-3">
      <BadgeHelpIcon />
      <span>Help & Supports</span>
    </DropdownMenuItem>
    <DropdownMenuItem className="gap-3">
      <MessageSquareMoreIcon />
      <span>FAQs</span>
    </DropdownMenuItem>
    <DropdownMenuItem className="gap-3">
      <BugIcon />
      <span>Bug Reports</span>
    </DropdownMenuItem>
  </>
);

// Main Component: ProfileDropdown
export function ProfileDropdown({ session, user, ...props }: UserAvatarProps) {
  const handleSignOut = useCallback(() => {
    authClient.signOut().then((_res) => {
      location.replace("/auth/sign-in");
    });
  }, []);

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
        className="-mr-2 min-w-xs"
      >
        {/* User Profile Section */}
        <DropdownMenuGroup className="p-1">
          <div className="justify-end-safe flex flex-col items-center gap-4 p-2">
            <ProfileDisplay
              className="w-full"
              session={session}
              user={user}
            />

            <div className="justify-end-safe flex w-full flex-row items-center gap-2">
              <DropdownMenuItem className="w-full justify-center border shadow-xs">
                <UserPlusIcon />
                <span>Add Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="w-full justify-center border shadow-xs"
                onClick={handleSignOut}
              >
                <LogOutIcon />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </div>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Organization Selection */}
        <DropdownMenuGroup className="p-1">
          <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-widest">
            Organization
          </DropdownMenuLabel>

          <OrganizationList />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Organization Management */}
        <DropdownMenuGroup className="p-1">
          <OrganizationSection />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Account Section */}
        <DropdownMenuGroup className="p-1">
          <AccountSection />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Support Section */}
        <DropdownMenuGroup className="p-1">
          <SupportSection />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
