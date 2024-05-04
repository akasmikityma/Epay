import React from 'react'

export default function Inputbox({label,onchange,placeholder}) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input onChange={onchange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200 pb-2" />
    </div>
  )
}
