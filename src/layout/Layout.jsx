import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
export const Layout = ({children}) => {
  return (
    <div className=''>
        <Header/>
        <main className='flex-1'>
            {children}
        </main>
        <Footer/>
    </div>
  )
}
