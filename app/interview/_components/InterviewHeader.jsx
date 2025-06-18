import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='flex items-center justify-between p-4 shadow-md border-b border-gray-200'>
      <Image
        src="/logo.png"
        alt="logo"
        width={20}
        height={20}
      />
    </div>
  )
}

export default InterviewHeader