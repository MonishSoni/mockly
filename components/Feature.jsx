"use client"

import { useUser } from '@stackframe/stack'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import FeatureCard from './FeatureCard'

function Feature() {
  const featuresData = [
    {
      title: "Structured Feedback",
      des: "Get detailed feedback on your performance, highlighting strengths and areas to improve.",
      image: "/clipboard.png"
    },
    {
      title: "Tailored Content",
      des: "Prepare for your interview with personalized questions and topic-specific content.",
      image: "/letter.png"
    },
    {
      title: "Interactive Interview",
      des: "Engage in a dynamic conversation with AI, simulating real interview conditions.",
      image: "/speech-bubbles.png"
    },
    {
      title: "Live Interview Experience",
      des: "Participate in a simulated video interview and get instant feedback on your responses.",
      image: "/video-chat.png"
    }
  ];

  const user = useUser();

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm'>My Workspace</p>
          <h2 className='text-2xl font-medium'>
            Welcome Back, {user.displayName}
          </h2>
        </div>

        <div className='cursor-pointer'>
          <Link href={'/handler/account-settings'}>
            <Button>Profile</Button>
          </Link>
        </div>
      </div>

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4   gap-6 '>
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            des={feature.des}
            image={feature.image}
          />
        ))}
      </div>
    </>
  );
}

export default Feature;
