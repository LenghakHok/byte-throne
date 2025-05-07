import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
      {/* <DialogContent></DialogContent> */}
    </Dialog>
  );
}
