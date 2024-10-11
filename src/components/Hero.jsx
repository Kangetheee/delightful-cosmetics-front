import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Image from "../assets/data"; 

const Hero = () => {
  return (
    <section className='max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[744px] w-full' id="home">
      <div className='flex flex-col-reverse md:flex-row items-center justify-between h-full'>
        {/* Left side: Text content */}
        <div className='w-full md:w-1/2 flex flex-col justify-center p-4'>
          <div>
            <h4 className='uppercase medium-18 tracking-wider'>Dress Essentials</h4>
            <h2 className='h1 capitalize max-w-[40rem]'>
              Upgrade Your Wardrobe <span className='text-secondary'> just a click away.</span>
              Shop with us Today!
            </h2>
            <p className='my-5 max-w-[33rem]'>
              Born from a passion for skincare and beauty, Delightful Cosmetics was founded with a 
              simple idea: to create makeup and skincare products that blend innovation with nature. 
              Our team of experts and beauty enthusiasts work tirelessly to develop formulations that 
              harness the power of natural ingredients, ensuring that every product nurtures your skin 
              while delivering flawless results.
            </p>
          </div>
          {/* buttons */}
          <div className='flex items-center gap-x-4'>
              {/* <Link to={''} className="inline-flex items-center justify-center gap-4 p-3 bg-slate-100 rounded-xl">
                <div className='regular-14 leading-tight pl-4 '>
                  <h5 className='uppercase font-extrabold'>New Arrivals</h5>
                  <p className='regular-14 mt-1'>20% off</p>
                </div>
                <div className='bg-primary h-10 w-10 p-1 rounded-full flexCenter'>
                  <FaArrowRight />
                </div>
              </Link>
              <Link to={''} className="inline-flex items-center justify-center gap-4 p-3 bg-slate-100 rounded-xl">
                <div className='regular-14 leading-tight pl-4'>
                  <h5 className='uppercase font-extrabold'>Hot Deals</h5>
                  <p className='regular-14 mt-1'>50% off</p>
                </div>
                <div className='bg-primary h-10 w-10 p-1 rounded-full flexCenter'>
                  <FaArrowRight />
                </div>
              </Link> */}
          </div>
        </div>

        {/* Right side: Image */}
        <div className='w-full md:w-1/2'>
          <img 
            src={Image} 
            alt="Wardrobe essentials" 
            className='object-cover h-60 md:h-full w-full' 
          />
        </div>
      </div>
    </section>
  )
}

export default Hero;
