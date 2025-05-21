import { Tabs, TabsList, TabsTrigger } from "@/core/ui/tabs";
import { For } from "@/core/utils/for";
import type { ComponentPropsWithRef } from "react";

const navs = [
  {
    value: "members",
    label: "Members",
  },
  {
    value: "invitaions",
    label: "Invitations",
  },
  {
    value: "inviduals",
    label: "Inviduals",
  },
];

export const TeamsNavs = (props: ComponentPropsWithRef<typeof Tabs>) => {
  return (
    <Tabs
      defaultValue="members"
      variant="default"
      {...props}
    >
      <TabsList className="w-fit border data-[orientation=horizontal]:justify-start">
        <For
          each={navs}
          render={(nav) => (
            <TabsTrigger
              className="w-fit data-[orientation=horizontal]:px-4"
              key={`TabsTrigger_${nav.value}`}
              value={nav.value}
            >
              {nav.label}
            </TabsTrigger>
          )}
        />
      </TabsList>
    </Tabs>
  );
};
