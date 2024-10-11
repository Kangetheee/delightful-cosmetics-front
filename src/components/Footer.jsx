import React from 'react'
import SocialIcons from './SocialIcons'
const Footer = () => {
  return (
    <footer className='max-padd-container bg-tertiary py-4'>
      <div className='flexCenter flex-col gap-y-4'>
        <h4 className='text-white'>Follow us on Social Media</h4>
        <SocialIcons />
        <hr className='h-[1px] w-2/3 my-3'/>
        <div className='text-white'>Copyright &copy; DelightCosmetics | All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer