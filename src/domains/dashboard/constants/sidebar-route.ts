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

export const navs = {
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

export const misc = [
  {
    title: "Helps & Supports",
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
