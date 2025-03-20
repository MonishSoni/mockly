import Image from 'next/image'
import React from 'react'

const Interviewer = ({ name, image }) => {
    return (
        <div>
            <Image src={image} alt='interviewewr image' width={75} height={75} className='rounded-xl cursor-pointer' />
            <p className='text-center text-md text-primary font-semibold '>{name}</p>
        </div>
    )
}

export default Interviewer