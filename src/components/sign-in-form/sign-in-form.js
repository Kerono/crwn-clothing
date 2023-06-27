import { useState } from "react"
import {signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from "../../utils/firebase"
import FormInput from "../form-input/form-input"
import Button, {buttonTypeClasses} from "../button/button"
import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles"

const defaultFormField  = {
	email: "",
	password: "",
} 
const SignInFrom = () => {
	const [formFields, setFormFields] = useState(defaultFormField)
	const { email, password,} = formFields
	const resetFormFields = () => {
		setFormFields(defaultFormField)
	}
	const signInWithGoogle = async () => {
		await signInWithGooglePopup()
	}
	const handleSubmit = async(event) => {
		event.preventDefault();

		try {
			const {user} = await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields()
		}
		catch (error){
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorrect password for email")
					break;
				case "auth/user-not-found" : 
					alert("user not found")
					break;
				default:
					console.log(error);
			}
			
			
		}
	}
	function handleChange (event) {
		const {name,value} = event.target
		setFormFields(prevValue => {
			return {
				...prevValue, 
				[name]: value
			}
		})
	}
	return (
		<SignInContainer>
			<h2>Already have an account? </h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				
				
				<FormInput
					label="Email" 
					type = "email" 
					required 
					onChange={handleChange} 
					name="email" 
					value={email} 
				/>
				
				<FormInput
					label="Password"
					type="password" 
					required 
					onChange={handleChange} 
					name="password" 
					value={password}
				/>
				<ButtonsContainer>
					<Button type="submit">Sign in</Button>
					<Button type = "button" buttonType = {buttonTypeClasses.google} onClick = {signInWithGoogle}>Google sign in</Button>
				</ButtonsContainer>
				
			</form>
		</SignInContainer>
	)
}
export default SignInFrom
