"use client"

import React, {useState, useEffect}from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"


export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  const modeLabel = isDark ? 'Light Mode' : 'Dark Mode';

  return (
    <div className='flex items-center gap-2 justify-between'>
      {/* side bar icons */}
      <div className="flex gap-2 items-center justify-between">
        <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}/>
        <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}/>
        <span className="sr-only">Toggle theme</span>
        <Label>{modeLabel}</Label>
      </div>
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
    </div>
  )
}