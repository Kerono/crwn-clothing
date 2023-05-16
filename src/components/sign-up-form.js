import { useState } from "react"
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../utils/firebase"
import FormInput from "./form-input"
import Button from "./button"
import {SingUpContainer} from "./sign-up-from.styles"

const defaultFormField  = {
	displayName : "",
	email: "",
	password: "",
	confirmPassword: ""
} 
const SignUpFrom = () => {
	const [formFields, setFormFields] = useState(defaultFormField)
	const {displayName, email, password, confirmPassword} = formFields
	const resetFormFields = () => {
		setFormFields(defaultFormField)
	}
	const handleSubmit = async(event) => {
		event.preventDefault();
		if(password !== confirmPassword){
			alert("passwords do not match")
			return 
		}
		try {
			const {user} = await createAuthUserWithEmailAndPassword(email,password)
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields()
		}
		catch (error){
			if (error.code === "auth/email-already-in-use") {
				alert("email already in use")
			} else {
				console.log(error)
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
		<SingUpContainer>
			<h2>Create new account? </h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display name" 
					type="text" 
					required 
					onChange={handleChange} 
					name="displayName" 
					value={displayName}
				/> 
				
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
				
				<FormInput
					label="Confirm password" 
					type="password" 
					required 
					onChange={handleChange} 
					name="confirmPassword" 
					value={confirmPassword}
				/>
				<Button type="submit">Sign up</Button>
			</form>
		</SingUpContainer>
	)
}
export default SignUpFrom
