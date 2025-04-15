'use client'

import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from '../custom/DarkMode'
import { Button } from '@/components/ui/button'
import SearchBar from '../custom/SearchBar';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Label}  from "@/components/ui/label";

import React from 'react'

const NavBar = () => {

const router = useRouter();

  return (
    <nav className='p-2 w-full items-center mx-auto'>

            <div className='flex justify-end px-4'>
                <div className='flex gap-4'>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
    </nav>
  )
}

export default NavBar