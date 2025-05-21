import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/ui/dropdown-menu";
import { teamsDeleteDialog$ } from "@/domains/teams/stores/teams-store";
import {
  CopyIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  Share2Icon,
  XIcon,
} from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export function TeamsActionsDropdownMenu({
  children,
  ...props
}: ComponentPropsWithRef<typeof DropdownMenu>) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>;
}

export function TeamsActionsTrigger(
  props: ComponentPropsWithRef<typeof DropdownMenuTrigger>,
) {
  return (
    <DropdownMenuTrigger
      asChild={true}
      {...props}
    >
      <Button
        className="size-8 text-muted-foreground"
        size="icon"
        variant="ghost"
      >
        <span className="sr-only">More</span>
        <EllipsisVerticalIcon />
      </Button>
    </DropdownMenuTrigger>
  );
}

interface TeamsActionsContentProps
  extends ComponentPropsWithRef<typeof DropdownMenuContent> {
  organizationId: string | undefined;
  teamId: string;
}

export function TeamsActionsContent({
  className,
  organizationId,
  teamId,
  ...props
}: TeamsActionsContentProps) {
  return (
    <DropdownMenuContent
      className={cn("w-40", className)}
      {...props}
    >
      {/* Copy ID */}
      <DropdownMenuItem className="gap-3">
        <CopyIcon />
        <span>Copy ID</span>
      </DropdownMenuItem>

      {/* Export PDF */}
      <DropdownMenuItem className="gap-3">
        <Share2Icon />
        <span>Share</span>
      </DropdownMenuItem>

      <DropdownMenuItem className="gap-3">
        <DownloadIcon />
        <span>Export PDF</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      {/* Delete Team */}
      <DropdownMenuItem
        className="gap-3"
        onClick={() =>
          teamsDeleteDialog$.set({
            isOpen: true,
            meta: {
              organizationId,
              teamId,
            },
          })
        }
        variant="destructive"
      >
        <XIcon />
        <span>Delete Team</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
