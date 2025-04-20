
import SearchBar from '../custom/SearchBar';
import React from 'react'

const NavBar = () => {


  return (
    <nav className='p-4 w-full flex flex-row justify-center'>
      <div className='w-[400px]'>
       <SearchBar />
      </div>
    </nav>
  )
}

export default NavBar