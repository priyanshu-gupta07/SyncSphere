import React from 'react'

interface Templateprops {
    children: React.ReactNode
}

const template:React.FC<Templateprops> = ({ children }) => {
  return (
    <div className='
    h-screen
    p-6 flex
    justify-center'>
        {children}
    </div>
  )
}

export default template