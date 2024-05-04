import React from 'react'

export default function Message({label}) {
  return (
    <div className='flex justify-center items-center  mb-6 '>
       <h1 className='border rounded-sm  shadow font-bold text-lg text-green-500 bg-yellow-300 p-4'>{label}</h1>
    </div>
  )
}
