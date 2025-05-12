import { cn } from "@/core/lib/cn";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/core/ui/navigation-menu";
import { mains } from "@/domains/dashboard/constants/navbar-route";
import { observable } from "@legendapp/state";
import { For, observer } from "@legendapp/state/react";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof NavigationMenu> {
  pathname: string;
}

const navlist = observable(mains);

export const Navs = observer((props: Props) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-2">
      <For
        each={navlist}
        optimized={true}
      >
        {(value, id) => (
          <NavigationMenuItem key={id}>
            <NavigationMenuLink
              className={cn(
                "rounded-full px-4 py-2 text-muted-foreground transition-all hover:text-foreground focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[active=true]:font-bold data-[active=true]:text-foreground",
              )}
              data-active={props.pathname.startsWith(value.utl.get())}
              href={value.utl.get()}
            >
              {value.title.get()}
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </For>
    </NavigationMenuList>
  </NavigationMenu>
));
