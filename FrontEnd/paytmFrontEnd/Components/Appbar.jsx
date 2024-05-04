import React from 'react'

export default function Appbar({user}) {
    if(!user){
        return(
            <div>loading</div>
        )
    }
  return (
    <div className="shadow h-14 flex justify-between px-4 bg-yellow-200">
        <div className="flex flex-col justify-center h-full ml-4">
            <h1 className='text-lg font-bold text-green-700'>E-Pay</h1>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                {user && user.first_name && user.first_name.charAt(0)}
                </div>
            </div>
        </div>
    </div>
  )
}
