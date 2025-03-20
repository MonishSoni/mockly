import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

const Appheader = () => {
  return (
    <div className='flex justify-between items-center px-8 py-3 shadow-xs'>
      <Image src={'/logo.svg'} alt='logo' width={70} height={30} />
      <UserButton />
    </div>

  )
}

export default Appheader