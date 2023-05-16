import { useContext } from "react"
import { CartContext } from "../contexts/cart-context"
import {
	CheckoutItemContainer,
	ImageContainer,
	DefaultSpanInfo,
	Quantity,
	Arrow,
	ValueSpan,
	RemoveButton
} from "./checkout-item.styles"

const CheckoutItem = ({cartItem}) => {
	const {name, imageUrl, price , quantity} = cartItem
	const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)
	const clearItemHandler = () => clearItemFromCart(cartItem)
	const addItemHandler = () => addItemToCart(cartItem)
	const removeItemHandler = () => removeItemFromCart(cartItem)
	return (
				 <CheckoutItemContainer>
			<ImageContainer>
				<img src= {imageUrl} alt={`${name}`}/>
			</ImageContainer>
			<DefaultSpanInfo> {name} </DefaultSpanInfo>
			<Quantity>
				<Arrow onClick={removeItemHandler}>
					&#10094;
				</Arrow>
				<ValueSpan>{quantity} </ValueSpan>
				<Arrow onClick={addItemHandler}>
					&#10095;
				</Arrow>
			</Quantity>
			<DefaultSpanInfo> {price} </DefaultSpanInfo>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer> 
	)
}

export default CheckoutItem  

