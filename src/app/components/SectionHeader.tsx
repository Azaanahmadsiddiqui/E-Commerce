import React from 'react'

const SectionHeader = ({heading , subHeading}: {heading: string, subHeading: string}) => {
  return (
    <div className='ml-[100px]'>
        <div className='flex items-center gap-2'>
            <div className='w-5 h-10 bg-brandPrimary rounded' />
            <h3 className='text-brandPrimary text-lg font-semibold'>{subHeading}</h3>
        </div>
        <h1 className='text-4xl font-semibold mt-2'>{heading}</h1>
    </div>
  )
}

export default SectionHeader