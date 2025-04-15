'use client'

import React from 'react';
import NavBar from '@/components/layout/NavBar';
import SideBar from '@/components/layout/SideBar';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex">

      {/* Sidebar on the left */}
      <SideBar />

      {/* Right side: NavBar + Page Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navigation Bar */}
        <NavBar />

        {/* Main Page Content */}
        <section className="flex-1 overflow-y-auto p-6">
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
