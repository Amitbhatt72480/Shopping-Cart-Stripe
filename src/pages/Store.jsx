import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { productsArray } from  '../Products'

const Store = () => {
  return (
	<>
  <Navbar />
  <h1 className="text-4xl mx-20 tracking-wider underline underline-offset-8 decoration-lime-500">Welcome to the store</h1>
  <div className="lg:grid lg:grid-cols-3 gap-10">
    {productsArray.map((item)=>{
      return <Card key={item.id} id={item.id} title={item.title} price={item.price} />
    })}
  </div>
  </>
  )
}

export default Store