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
    <nav className='p-4 w-full max-w-6xl items-center mx-auto'>
        <Card className="p-2 rounded-md px-0">
            <CardContent className='flex justify-between'>
                <Button variant={'link'} onClick={() => router.push('/dashboard') }>CacheCast</Button>
                <div className=''>
                    {/* <div>
                        <SearchBar />
                    </div> */}
                    <div>
                        <ThemeSwitcher />
                    </div>
                </div>
            </CardContent>
        </Card>
    </nav>
  )
}

export default NavBar