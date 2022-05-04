import React from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
    children: React.ReactNode
}

function PageLayout({ children }: Props) {
    return (
        <div className='flex flex-col justify-between h-screen'>
            {children}
        </div>
    )
}

export default PageLayout