import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/ui/dialog";
import { PlusIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof Dialog> {}

export function CreateTeamDialog({ ...props }: Props) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild={true}>
        <Button>
          <PlusIcon />
          <span>Create new team</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh min-h-1/2">
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>
            Fill in the fields below to create a new team
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
