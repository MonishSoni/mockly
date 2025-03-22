
"use client"
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { UserButton } from '@stackframe/stack';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const DiscussionRoomPage = () => {
  const { roomid } = useParams();
  const roomData = useQuery(api.DiscussionRoom.getDiscussionRoom, { id: roomid });

  if (!roomData) return <div>Loading...</div>;
  if (!roomid) return <div>Error: Room ID not found.</div>;

  console.log(roomData)

  return (
    <>
      <p>Topic: {roomData.topic}</p>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mt-3'>

        <div className=' lg:col-span-2'>

          <div className='bg-secondary h-[65vh] rounded-lg flex justify-center items-center relative'>
            <div className='flex items-center justify-center flex-col gap-0.5 '>
              <Image className='rounded-full animate-pulse' src={`/${roomData.expertName}.jpeg`} width={100} height={100} alt='expert image' />
              <p className='text-gray-600'>{roomData.expertName}</p>
            </div>

            <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-8 right-8'>
              <UserButton />
            </div>

          </div>

          <div className='flex justify-center items-center mt-3'>
            <Button>Connect Now</Button>
          </div>

        </div>

        <div>




          <div className='bg-secondary h-[65vh] rounded-lg flex items-center justify-center'>
            <p className='text-gray-600'>Conversation</p>
          </div>

          <p className='text-sm text-gray-600 text-center mt-3 px-14'>At the end of your converstion feedback will be generated automatically</p>

        </div>

      </div>





    </>
  );
};

export default DiscussionRoomPage;
