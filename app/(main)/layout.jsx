import Appheader from '@/components/Appheader'
import React from 'react'

const DashbaordLayout = ({ children }) => {
    return (
        <div>
            <Appheader />
            <div className='px-10 md:px-20 lg:px-30 py-4 md:py-8 lg:py-12'>
                {children}
            </div>
        </div>
    )
}

export default DashbaordLayout