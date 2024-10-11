import React from 'react';
import { categories } from '../assets/data';

const Categories = ({ category, setCategory }) => {
  return (
    <section className='max-padd-container py-16 xl:py-20' id='shop'>
      <div className='flex flex-wrap justify-center gap-6'>
        {categories.map((item) => (
          <div 
            onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)}
            id={item.name}
            key={item.name}
            className={`py-10 px-32 sm:py-10 sm:px-32 rounded-3xl text-center cursor-pointer ${
              category === item.name ? "bg-[#ffd783]" : "bg-secondary hover:bg-[#f0c45c]"
            }`}
          >
            <img src={item.image} alt={`${item.name} category`} className="mx-auto h-12 w-12 object-contain" />
            <h4 className='mt-6 medium-18'>{item.name}</h4>
          </div>
        ))}
      </div>
    </section>  
  );
};

export default Categories;
