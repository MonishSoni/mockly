import Image from 'next/image'
import React from 'react'

const History = () => {
  return (
    <>
      <div className='flex flex-col gap-2.5'>


        <div className='flex items-center justify-start gap-2.5'>
          <Image src={'/clock.png'} alt='history' width={35} height={35} />
          <h2 className='text-xl font-semibold'>Past Interviews</h2>
        </div>

        <p className='text-sm text-gray-600'>You haven't completed any interviews yet. Start your first mock interview to track your progress!</p>
      </div>
    </>
  )
}

export default History