import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart-selector';
import { addItemToCart } from '../../store/cart/cart-action';
import Button, {buttonTypeClasses} from '../button/button';
import {
  ProductCartContainer,
  Footer,
  Name,
} from './product-card.styles';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <span>{price}</span>
      </Footer>
      <Button
        buttonType={buttonTypeClasses.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;

