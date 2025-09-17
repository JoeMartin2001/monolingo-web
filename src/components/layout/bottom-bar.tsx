"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import ExploreIcon from "@/components/icons/ExploreIcon";
import MessagesIcon from "@/components/icons/MessagesIcon";
import GroupsIcon from "@/components/icons/GroupsIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const NavLinkIconMap = {
  Explore: ExploreIcon,
  Messages: MessagesIcon,
  Groups: GroupsIcon,
  Profile: ProfileIcon,
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Explore",
    href: "/explore",
    icon: "Explore",
  },
  {
    label: "Chats",
    href: "/chat",
    icon: "Messages",
  },
  {
    label: "Groups",
    href: "/groups",
    icon: "Groups",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "Profile",
  },
];

export function BottomBar() {
  const pathname = usePathname();

  if (!NAV_ITEMS.length) return null;

  return (
    <nav className="flex items-center justify-around h-16 px-2 border-t border-gray-200">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/explore" && pathname.startsWith(item.href));

        const IconComponent = item.icon
          ? NavLinkIconMap[item.icon as keyof typeof NavLinkIconMap]
          : null;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full text-sm transition-colors"
            )}
            style={{
              color: isActive ? "var(--primary)" : "var(--gray-400)",
            }}
          >
            {IconComponent && <IconComponent className={cn("w-5 h-5")} />}
            <p className="text-xs text-center hidden sm:block">{item.label}</p>
          </Link>
        );
      })}
    </nav>
  );
}
