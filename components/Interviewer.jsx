import Image from 'next/image';
import React from 'react';

const Interviewer = ({ name, image, selectexp, setselectedexp }) => {
    return (
        <div onClick={() => setselectedexp(name)} >
            <Image
                src={image}
                alt='interviewer image'
                width={75}
                height={75}
              
                className={`${selectexp === name
                    ? 'border-2 border-primary rounded-xl cursor-pointer  px-0.5 py-0.5'
                    : 'border-2 border-white rounded-xl cursor-pointer hover:scale-105 transition-all cover px-0.5 py-0.5'
                }`}

            />
            <p className='text-center text-md text-primary font-medium'>{name}</p>
        </div>
    );
};

export default Interviewer;
