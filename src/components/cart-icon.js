import { useContext } from "react"
import { CartContext } from "../contexts/cart-context"
import {CartItemContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles"
const CartIcon = () => {
	const {isCartOpen,setIsCartOpen, cartCount} = useContext(CartContext)
	const toggleIsCardOpen = () => setIsCartOpen(!isCartOpen)
	return (
		<CartItemContainer onClick={toggleIsCardOpen}>
			<ShoppingIcon/>
			<ItemCount>{cartCount}</ItemCount>
		</CartItemContainer>
		
	)
}
export default CartIcon
