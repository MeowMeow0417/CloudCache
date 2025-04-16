'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Settings,
  MapPinnedIcon,
  DatabaseIcon,
  BrushIcon
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Saved Location', href: '/dashboard/savedLocation', icon: MapPinnedIcon },
  { name: 'Cache', href: '/components/custom/CacheSim', icon: DatabaseIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Design', href: '/dashboard/design', icon: BrushIcon },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] min-h-screen border-r shadow-md bg-background flex flex-col ">
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-bold tracking-tight">
          Cache Cast
        </Link>
      </div>

      <nav className="flex flex-col px-2">
        {navigation.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200
                ${isActive
                  ? "bg-card text-primary font-semibold border-r-4 border-primary rounded-none"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50 hover:border-r-2 hover:hoverborder-primary hover:rounded-none"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate">{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
