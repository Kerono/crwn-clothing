import Home from "./routes/home/Home"
import { useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { useEffect} from "react"
import {onAuthStateChangedListener, createUserDocumentFromAuth} from "./utils/firebase"
import { setCurrentUser } from "./store/user/user-action"
import Navigation from "./routes/navigation/navigation"
import Authentication from "./routes/authentication/authentication"
import Shop from './routes/shop/shop'
import Checkout from "./routes/checkout/checkout"

const App = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user)
			}
			dispatch(setCurrentUser(user))
		})
		return unsubscribe
	}, [dispatch])
	return (
		<Routes>
			<Route path="/" element= {<Navigation/>}>
				<Route index element= {<Home/>}/>
				<Route path="shop/*" element= {<Shop/>}/>
				<Route path="auth" element= {<Authentication/>}/>
				<Route path="checkout" element= {<Checkout/>}/>
			</Route>
		</Routes>
	)
}
export default App;
