'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import NavBar from '@/components/layout/NavBar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <main className='min-h-screen flex flex-col'>

        <NavBar />
        {children}

    </main>
  )
}

export default DashboardLayout