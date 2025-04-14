'use client'

import { Input } from '../ui/input'

import React from 'react'

const SearchBar = () => {
  return (
    <>
        <Input
            placeholder="Search..."
            className="w-[300px] "
        />
    </>
  )
}

export default SearchBar