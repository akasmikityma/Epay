import React from 'react'

export default function Button({label,onclick}) {
  return (
    <div>
     <button onClick={onclick} className='bg-sky-200 px-3 py-2 border rounded-md'>{label}</button>
    </div>
  )
}
