import React from 'react'

interface Props {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputRef?: React.RefObject<HTMLInputElement>
}

function Input({name, value, inputRef, onChange}: Props) {
  return (
    <input type="text" name={name} ref={inputRef} value={value} onChange={onChange} className='w-full px-2 py-0.5 text-sm outline-none rounded-lg border-2 border-indigo-200 hover:border-indigo-500 duration-300 focus:border-indigo-500'/>
  )
}

export default Input