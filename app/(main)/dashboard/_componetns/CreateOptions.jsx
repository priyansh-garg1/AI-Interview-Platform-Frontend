import { Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
        <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5 cursor-pointer' >
            <Video className='p-3 text-primary bg-blue-100 rounded-lg h-12 w-12'/>
            <h2 className='text-md font-bold'>Create New Interview</h2>
            <p className='text-sm text-gray-500'>Create AI Interviews ans schedule then with Canditates</p>
        </Link>
        <div className='bg-white border border-gray-200 rounded-lg p-5'>
            <Video className='p-3 text-primary bg-blue-100 rounded-lg h-12 w-12'/>
            <h2 className='text-md font-bold'>Create Phone Screening Call</h2>
            <p className='text-sm text-gray-500'>Schedule phone screening calls with Canditates</p>
        </div>
    </div>
  )
}

export default CreateOptions