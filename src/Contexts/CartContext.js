import { createContext, useState } from "react";
import {productsArray} from '../Products'


export const CartContext = createContext({
	items: [],
	getProductQuantity: () => {},
	addOnetoCart: () => {},
	removeOneFromCart: () => {},
	deleteFromCart: () => {},
	getTotalCost: () => {},
});


export function CartProvider({children}){

	const [cartProducts, setCartProducts] = useState([]);
	 
	function getProductQuantity(id){
		let quantity = cartProducts.find(product => product.id === id)?.quantity
		if (quantity === undefined){
			return 0;
		}
		return quantity;
	}

	function addOnetoCart(id){
		const quantity = getProductQuantity(id);

		if (quantity === 0){
			setCartProducts([
				...cartProducts,
				{
					id:id,
					quantity:1
				}
			])
		}else{
			setCartProducts(
				cartProducts.map(
					product => 
					product.id === id
					? {...product, quantity: product.quantity + 1}
					: product
				)
			)
		}
	}

	const removeOneFromCart = (id) =>{
		const quantity = getProductQuantity(id);

		if (quantity === 1){
			deleteFromCart(id);
		}else{
			setCartProducts(
				cartProducts.map(
					product => 
					product.id === id
					? {...product, quantity: product.quantity - 1}
					: product
				)
			)
		}
	}

	const deleteFromCart = (id)=>{
		setCartProducts(
			cartProducts =>
			cartProducts.filter(currentProduct => {
				return currentProduct.id !== id
			})
		)
	}

	function getProductData(id){
		let productData = productsArray.find(product => product.id === id)
		return productData;
	}

	const getTotalCost = () =>{
		let totalCost = 0;
		cartProducts.map((cartItem)=>{
			const productData = getProductData(cartItem.id);
			totalCost += (productData.price * cartItem.quantity);
		});
		return totalCost
	}



	const contextValue = {
		items: cartProducts,
		getProductQuantity,
		addOnetoCart,
		removeOneFromCart,
		deleteFromCart,
		getTotalCost
	}

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider