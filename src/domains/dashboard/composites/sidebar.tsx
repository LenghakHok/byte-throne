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
import { For } from "@/utils/for";
import {
  BadgeHelpIcon,
  BoxIcon,
  CalendarFoldIcon,
  CastleIcon,
  CompassIcon,
  CrownIcon,
  HomeIcon,
  SettingsIcon,
  SwordsIcon,
} from "lucide-react";
import React from "react";

// This is sample data
const navs = {
  general: [
    {
      title: "Home",
      url: "/dashboard",
      icon: HomeIcon,
      isActive: true,
    },
  ],
  fun: [
    {
      title: "Explore",
      url: "/explore",
      icon: CompassIcon,
      isActive: false,
    },
    {
      title: "Competition",
      url: "/competition",
      icon: SwordsIcon,
      isActive: false,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: CrownIcon,
      isActive: false,
    },
  ],
  management: [
    {
      title: "Events",
      url: "/events",
      icon: CalendarFoldIcon,
      isActive: false,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: BoxIcon,
      isActive: false,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: CastleIcon,
      isActive: false,
    },
  ],
};

const misc = [
  {
    title: "Help",
    url: "/help",
    icon: BadgeHelpIcon,
    isActive: false,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
    isActive: false,
  },
];

export function Sidebar({
  ...props
}: React.ComponentProps<typeof SidebarRoot>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(navs.general[0]);

  return (
    <SidebarProvider>
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
                            <SidebarMenuButton
                              className="size-fit rounded-full border border-transparent p-2 text-muted-foreground transition-colors data-[active=true]:border-border data-[active=true]:bg-card data-[active=true]:shadow-xs [&>svg]:size-4.5"
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
        <SidebarFooter className="mx-auto p-0">
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
                        className="size-fit rounded-full border border-transparent p-2 text-muted-foreground transition-colors data-[active=true]:border-border data-[active=true]:bg-card data-[active=true]:shadow-xs [&>svg]:size-4.5"
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
