import React from 'react'
import { CartContext } from '../Contexts/CartContext'
import { useContext } from 'react'

const Card = ({id, title, price}) => {

	const cart = useContext(CartContext)
	const productQuantity = cart.getProductQuantity(id);

  return (
	<div className='bg-gray-100 py-5 rounded-2xl shadow-2xl mx-20 items-center justify-center my-20 flex flex-col'>
		<h1 className="py-3 text-3xl font-bold tracking-wider ">{title}</h1>
		<h1 className="py-3 font-semibold text-xl tracking-widest">${price}</h1>
		{ productQuantity > 0 ?
		 <div>
			<div className=" flex justify-between items-center space-x-20">
				<div><h1 className="text-xl font-bold ">In Cart: {productQuantity}</h1></div>
				<div className="flex ">
					<button onClick={()=> cart.addOnetoCart(id)} className="text-2xl bg-blue-500 px-2 py-1 text-white mx-2 rounded">+</button>
					<button onClick={()=> cart.removeOneFromCart(id)} className="text-2xl bg-blue-500 px-2 py-1 text-white mx-2 rounded">-</button>
				</div>
			</div>
			<button onClick={()=>{cart.deleteFromCart(id)}} className="mx-auto bg-red-500 text-center text-white px-3 py-2 my-4 rounded-2xl">Remove from Cart</button>
		 </div>
		:<button onClick={() => cart.addOnetoCart(id)} className="mx-auto my-2 bg-blue-500 text-white px-4 py-2 rounded-xl shadow-2xl hover:bg-blue-600 hover:scale-105 duration-300 ">Add to Cart</button>}	</div>
  )
}

export default Card