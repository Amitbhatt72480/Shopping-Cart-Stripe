import React, { useState } from 'react'
import { CartContext } from '../Contexts/CartContext'
import { useContext } from 'react'
import CartProd from './CartProd'

const Navbar = () => {
  const [showcart, setShowcart] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleshow = () =>{
    setShowcart((prev)=>{
      return !prev
    })
  }

  const cart = useContext(CartContext)
  const productQuantity = cart.items.reduce((sum, product) =>sum + product.quantity, 0)


  const checkout = async () => {
    setLoading(true)
    await fetch('http://localhost:4000/checkout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: cart.items})
    }).then((response) => {
        return response.json();
    }).then((response) => {
        if(response.url) {
            window.location.assign(response.url); // Forwarding user to Stripe
        }
    });
}

  return (
  <>
	<div className='relative text-3xl flex items-center justify-between mx-20 p-4'>
    <h1 className="text-teal-600 tracking-widest">E-Commerce Store</h1>
    <button onClick={handleshow} className="bg-gradient-to-r from-blue-500  to-purple-500 tracking-widest text-white px-4 py-2 rounded-2xl shadow-xl">Cart {productQuantity} items</button>
  </div>
    {showcart && <div className="absolute shadow-2xl right-10 top-24  bg-slate-100 h-auto w-[500px]">
      <div className="flex  p-5 items-center justify-between bg-slate-200">
      <h1 className="text-xl font-bold tracking-wider ">Shopping Cart</h1>
      <button onClick={handleshow} className="bg-blue-500 text-white px-3 py-1 rounded-3xl tracking-wide ">Close</button>
      </div>

      <div className="">
        {productQuantity > 0 ?
        <div>
          <p className="font-bold text-xl m-5 ">Items in your cart</p>
          {cart.items.map((item) => {
             return <CartProd key={item.id} id={item.id} quantity={item.quantity} />
          })} 
          <h1 className="text-3xl font-bold mx-5 my-3">Total Cost: ${cart.getTotalCost().toFixed(2)}</h1>
          {loading ? 
          <button disabled="true" type="button" className="text-white mx-5 mb-3  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
          <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
          </svg>
          Loading...
      </button> : 
          <button onClick={checkout} className=" bg-green-500 text-white px-4 py-2 rounded-2xl shadow-xl my-4 mx-5 acitve:animate-spin">Purchase Items</button>}
        </div>
      : <h1>No items in your Cart</h1>}
      </div>
      <hr />
    </div>}
  </>
  )
}

export default Navbar