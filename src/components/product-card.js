import { useContext } from "react"
import {ProductCardContainer, Footer} from "./product-card.styles"
import Button, { buttonTypeClasses } from "./button"
import { CartContext } from "../contexts/cart-context"

const ProductCard = ({ product }) => {
	const { name, price, imageUrl} = product
	const { addItemToCart } = useContext(CartContext)
	const addProductToCart = () => {
		addItemToCart(product)
	}
	return (
		<ProductCardContainer>
			<img src = {imageUrl} alt = {`${name}`}/>
			<Footer>
				<span className="name"> {name} </span>
				<span className="price"> ${price} </span>
			</Footer>
			<Button buttonType= {buttonTypeClasses.inverted} onClick = {addProductToCart}> Add to card </Button>
		</ProductCardContainer>
	)
}

export default ProductCard

