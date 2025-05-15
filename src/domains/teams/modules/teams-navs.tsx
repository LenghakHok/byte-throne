import { Tabs, TabsList, TabsTrigger } from "@/core/ui/tabs";
import type { ComponentPropsWithRef } from "react";

export const TeamsNavs = (props: ComponentPropsWithRef<typeof Tabs>) => {
  return (
    <Tabs
      defaultValue="members"
      variant="default"
      {...props}
    >
      <TabsList className="w-fit border data-[orientation=horizontal]:justify-start">
        <TabsTrigger
          className="w-fit data-[orientation=horizontal]:px-4"
          value="members"
        >
          Members
        </TabsTrigger>
        <TabsTrigger
          className="w-fit data-[orientation=horizontal]:px-4"
          value="invitations"
        >
          Invitations
        </TabsTrigger>
        <TabsTrigger
          className="w-fit data-[orientation=horizontal]:px-4"
          value="teamless"
        >
          Teamless
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
