import styled from "styled-components";
import { Link } from "react-router-dom"

export const Body = styled(Link)`
	height: 90px;
	padding: 0 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
	background-color: white;
	opacity: 0.7;
	position: absolute;
	
	h2 {
		font-weight: bold;
		margin: 0 6px 0;
		font-size: 22px;
		color: #4a4a4a;
		text-transform: uppercase;
	}

	p {
		font-weight: lighter;
		font-size: 16px;
	}
`
export const DirectoryItemContainer = styled.div`
 	min-width: 30%;
 	height: 240px;
 	flex: 1 1 auto;
 	display: flex;
 	align-items: center;
 	justify-content: center;
 	border: 1px solid black;
 	margin: 0 7.5px 15px;
 	overflow: hidden;
	background-image: ${({imageUrl}) => `url(${imageUrl})` };
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	
	&:hover {
	cursor: pointer;
	transform: scale(1.2);
	transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
	background-size: 100%;
	
	& ${Body} {
		opacity: 0.9;
	}
	}
	
	
`

