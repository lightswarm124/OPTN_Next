import React from 'react'
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className='flex-between w-full mb-8 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src='/public/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className="logo_text">CashToken</p>
      </Link>
    </nav>
  )
}

export default Nav