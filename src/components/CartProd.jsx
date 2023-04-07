import React from 'react'
import { CartContext } from '../Contexts/CartContext'
import { useContext } from 'react'
import { productsArray } from '../Products'

const CartProd = ({id, quantity}) => {

	function getProductData(myid){
		let productData = productsArray.find(product => product.id === myid)
		console.log(productData);
		return productData;

	}

	const cart = useContext(CartContext)
	const ProductData = getProductData(id)

  return (
	<div className='bg-gray-200 h-auto mx-5 my-5 px-3 py-4 rounded-xl shadow-xl'>
		<h1 className="font-bold text-xl">{ProductData.title}</h1>
		<h1 className="">{quantity} total</h1>
		<h1 className="font-semibold text-xl">${(quantity * ProductData.price).toFixed(2)}</h1>
		<button onClick={()=>{
			cart.deleteFromCart(id)
		}} className="my-3 bg-red-500 text-white px-3 py-1 rounded-xl">Remove</button>
		<hr />
	</div>
  )
}

export default CartProd