import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user-selector"
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import {ReactComponent as CrownLogo} from "../../assets/crown.svg"
import { signOutUser } from "../../utils/firebase"
import { selectIsCartOpen } from "../../store/cart/cart-selector"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles"
const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser)
	const  isCartOpen  = useSelector(selectIsCartOpen)
	return (
		<>
			<NavigationContainer>
				<LogoContainer as = "a" href="/">
					<CrownLogo/>
				</LogoContainer>
				<NavLinks>
					<NavLink as="a" href="/shop">
						Shop
					</NavLink>
					{currentUser? (
						<NavLink as = "span" onClick={signOutUser}>Sign out</NavLink>
					): (
						<NavLink as = "a" href="/auth">
							Sign in
						</NavLink>
					)}
					<CartIcon/>
				</NavLinks>
				{ isCartOpen && <CartDropdown/>}
			</NavigationContainer>
			<Outlet/>
		</>
	)
}
export default Navigation
