import React from 'react'

interface Props {
    type: "button" | "submit" | "reset" | undefined,
    disabled?: boolean,
    children: React.ReactNode
}

function Button({ type, children, disabled }: Props) {
  return (
    <button type={type} disabled={disabled} className='flex items-center gap-1 bg-indigo-500 text-white text-sm border-solid px-3 py-1.5 rounded-md duration-200 whitespace-nowrap active:bg-indigo-800 disabled:opacity-50'>
        {children}
    </button>
  )
}

export default Button