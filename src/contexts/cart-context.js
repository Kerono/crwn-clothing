import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer";
const addCartItem = (cartItems, productToAdd) => {
	const exsistingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
	if (exsistingCartItem) {
		return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
		? {...cartItem, quantity: cartItem.quantity + 1} 
		: cartItem)
	}
	return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	const exsistingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
	if(exsistingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
	}
	return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
		? {...cartItem, quantity: cartItem.quantity - 1} 
		: cartItem)

}

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
})

const CART_ACTION_TYPES = {
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
}

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
}

const cartReducer = (state, action) => {
	const {type, payload} = action;
	
	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS: 
		return {
			...state,
			...payload
		}
		case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
		return {
			...state,
			isCartOpen: payload,
		}
		default:
			throw new Error(`unhandled type ${type} in cartReducer`)
}
}

export const CartProvider = ({children}) => {
	const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer,INITIAL_STATE )

	const updateCartItemReducer = (newCartItems) => {
		
		const newCartTotal = newCartItems.reduce((total, cartItem) => {
			return total + cartItem.quantity * cartItem.price
		}, 0)
		const newCartCount = newCartItems.reduce((total, cartItem) => {
			return total + cartItem.quantity
		}, 0)
		
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount} 
		))
	}
	
	const removeItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems,cartItemToRemove)
		updateCartItemReducer(newCartItems)
	}
	
	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd)
		updateCartItemReducer(newCartItems)
	}
	
	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems,cartItemToClear)
		updateCartItemReducer(newCartItems)
	}
	
	const setIsCartOpen = (bool) => {
		dispatch(
			createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
		)
	}
	
	const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, clearItemFromCart, cartTotal}
	return (
		<CartContext.Provider value = {value} >{children}</CartContext.Provider>
	)
}
