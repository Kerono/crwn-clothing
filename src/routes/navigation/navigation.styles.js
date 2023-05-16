import styled from "styled-components";
import { Link } from "react-router-dom";
export const NavigationContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`
export const LogoContainer = styled(Link)`
	padding: 12px;
`
export const NavLinks = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
` 
export const NavLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
`

 