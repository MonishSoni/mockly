import React from 'react';
import UserInputDialog from './UserInputDialog';

const FeatureCard = ({ title, des, image }) => {
  return (
    <UserInputDialog >
      <div className='bg-white shadow-sm rounded-lg p-6 cursor-pointer'>
        <img src={image} alt={title} className='w-16 h-16 mb-4 mx-auto' />
        <h3 className='text-xl font-semibold text-center'>{title}</h3>
        <p className='text-sm text-gray-600 text-center mt-1'>{des}</p>
      </div>
    </UserInputDialog>
  );
}

export default FeatureCard;
