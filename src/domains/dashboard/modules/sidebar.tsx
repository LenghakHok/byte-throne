import { Logo } from "@/components/core/logo";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Sidebar as SidebarRoot,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { misc, navs } from "@/domains/dashboard/constants/sidebar-route";
import { For } from "@/utils/for";
import React from "react";

interface Props extends React.ComponentProps<typeof SidebarRoot> {
  pathname: string;
}

export function Sidebar({ pathname, ...props }: Props) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(
    Object.values(navs)
      .flat()
      .filter((item) => pathname.startsWith(item.url))[0],
  );

  return (
    <SidebarProvider className="w-fit">
      <SidebarRoot
        className="!w-16 overflow-hidden bg-transparent"
        collapsible="none"
        {...props}
      >
        <SidebarHeader className="mx-auto">
          <SidebarMenu>
            <SidebarMenuItem className="size-fit overflow-visible">
              <SidebarMenuButton
                asChild={true}
                className="size-12 overflow-visible rounded-full p-0"
              >
                <Logo
                  className="p-0 [&_svg:not([class*='size-'])]:size-8"
                  href="/dashboard"
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator className="mx-auto bg-transparent data-[orientation=horizontal]:w-8" />
        <SidebarContent className="mx-auto">
          <For
            each={Object.entries(navs)}
            render={(nav) => (
              <React.Fragment key={`sidebar_${nav[0]}`}>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-2">
                      <For
                        each={nav[1]}
                        render={(item) => (
                          <SidebarMenuItem
                            className="size-fit"
                            key={`${nav[0]}_${item.title}`}
                          >
                            <a
                              className="size-fit rounded-full"
                              href={item.url}
                              tabIndex={-1}
                            >
                              <SidebarMenuButton
                                className="size-fit rounded-full border border-transparent p-2 transition-colors data-[active=true]:border-border data-[active=true]:bg-card data-[active=true]:shadow-xs [&>svg]:size-4.5"
                                isActive={activeItem?.title === item.title}
                                onClick={() => {
                                  setActiveItem(item);
                                }}
                                tooltip={{
                                  children: (
                                    <span className="font-bold">
                                      {item.title}
                                    </span>
                                  ),
                                  hidden: false,
                                }}
                              >
                                <item.icon />
                                <span className="sr-only">{item.title}</span>
                              </SidebarMenuButton>
                            </a>
                          </SidebarMenuItem>
                        )}
                      />
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </React.Fragment>
            )}
          />
        </SidebarContent>
        <SidebarFooter className="mx-auto mb-6 p-0">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                <For
                  each={misc}
                  render={(item) => (
                    <SidebarMenuItem
                      className="size-fit"
                      key={`misc_${item.title}`}
                    >
                      <SidebarMenuButton
                        className="size-fit rounded-full border border-transparent p-2 transition-colors data-[active=true]:border-border data-[active=true]:bg-card data-[active=true]:shadow-xs [&>svg]:size-4.5"
                        isActive={activeItem?.title === item.title}
                        onClick={() => {
                          setActiveItem(item);
                        }}
                        tooltip={{
                          children: (
                            <span className="font-bold">{item.title}</span>
                          ),
                          hidden: false,
                        }}
                      >
                        <item.icon />
                        <span className="sr-only">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarRoot>
    </SidebarProvider>
  );
}
