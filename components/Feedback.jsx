import React from 'react'
import Image from 'next/image'

const Feedback = () => {
  return (
    <>
      <div className='flex flex-col gap-2.5'>
        <div className='flex items-center justify-start gap-2.5'>
          <Image src={'/opinion.png'} alt='feedback' width={35} height={35} />
          <h2 className='text-xl font-semibold'>Feedbacks</h2>
        </div>
        <p className='text-sm text-gray-600'>No feedback available yet. Complete an interview to receive feedback on your performance</p>
      </div>
    </>
  )
}

export default Feedback