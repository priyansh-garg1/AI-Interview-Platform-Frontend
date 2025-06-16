'use client'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import React, { useState } from 'react'

function LatestInterviewList() {
    const [interviewList, setInterviewList] = useState([])
  return (
    <div className='my-5'>
        <h2 className='text-2xl font-bold'>Latest Interview</h2>
        {
          interviewList.length === 0 && (
            <div className=' p-5 flex flex-col gap-3 items-center mt-5 bg-white rounded-xl'>
              <Camera className='h-10 w-10 text-primary'/>
            <p className='text-gray-500'>No interviews created yet.</p>
            <Button>Create New Interview</Button>
            </div>
          )
        }
    </div>
  )
}

export default LatestInterviewList