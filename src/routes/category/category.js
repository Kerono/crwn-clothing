import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router"
import ProductCard from "../../components/product-card/product-card";
import { selectCategoriesMap } from "../../store/categories/category-selector";
import {CategoryContainer, CategoryTitle} from "./category.styles"

const Category = () => {
	const {category} = useParams();
	const categoriesMap = useSelector(selectCategoriesMap)
	const [products, setProducts] = useState(categoriesMap[category])
	useEffect(() => {
		setProducts(categoriesMap[category])
	}, [category, categoriesMap])
	return (
		<>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			<CategoryContainer>
				{products && 
				products.map(product => <ProductCard key = {product.id} product={product}/>)
				}
			</CategoryContainer>
		</>

	)
}
	
export default Category
