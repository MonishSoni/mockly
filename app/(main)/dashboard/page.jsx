import Feature from '@/components/Feature'
import Feedback from '@/components/Feedback'
import History from '@/components/History'
import React from 'react'

const dashbaord = () => {
  return (
    <div>
      <Feature />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14'>
        <History />
        <Feedback />
      </div>
    </div>
  )
}

export default dashbaord