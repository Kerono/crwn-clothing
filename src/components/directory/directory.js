import {CategoriesContainer} from "./directory.styles"
import DirectoryItem from "../directory-item/directory-item"
const Directory = ({categories}) => {
	return (
		<CategoriesContainer>
			{categories.map((category) => {
				return (
					<DirectoryItem 
						key={category.id}
						title={category.title} 
						imageUrl= {category.imageUrl}
					/>
			)
			})}
		</CategoriesContainer>
	)
}
export default Directory
