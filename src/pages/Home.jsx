import React from 'react'
import { useState } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductDisplay from '../components/ProductDisplay'
import Footer from '../components/Footer'

const Home = () => {
  
  const [category, setCategory] = useState('All')

  return (
    <>
      <Hero />
      <Categories category={category} setCategory={setCategory} />
      <ProductDisplay category={category} />
      <Footer />
    </>
  )
}

export default Home