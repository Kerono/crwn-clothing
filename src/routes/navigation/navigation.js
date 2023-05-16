import { Outlet } from "react-router-dom"
import { useContext } from "react"
import CartIcon from "../../components/cart-icon"
import CartDropdown from "../../components/cart-dropdown"
import {ReactComponent as CrownLogo} from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user-context"
import { CartContext } from "../../contexts/cart-context"
import { signOutUser } from "../../utils/firebase"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles"
const Navigation = () => {
	const { currentUser} = useContext(UserContext)
	const { isCartOpen } = useContext(CartContext)
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
