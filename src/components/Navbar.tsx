import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full p-2 border-b-2 border-slate-300'>
      <div className="container mx-auto flex justify-center">
        <Link to='/' className='font-semibold text-xl'>Taskify</Link>
      </div>
    </div>
  )
}

export default Navbar