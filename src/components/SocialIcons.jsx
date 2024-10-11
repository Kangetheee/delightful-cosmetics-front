import React from 'react'
import { RiFacebookFill, RiInstagramFill, RiTwitterXFill, RiYoutubeFill } from 'react-icons/ri'
import {Link} from 'react-router-dom'
const SocialIcons = () => {
  return (
    <div className='flex gap-6 pr-4'>
        <Link to={'https://www.instagram.com/delightful_cosmetics_ent'} className='text-[#f32e80] text-2xl hover:-translate-y-1 transition-all duration-500'>
            <RiInstagramFill href=''/>
        </Link>
    </div>
  )
}

export default SocialIcons