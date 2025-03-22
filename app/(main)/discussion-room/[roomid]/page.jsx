"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const room = () => {

    const {roomid} = useParams()
  return (
    <div> room id - {roomid}</div>
  )
}

export default room