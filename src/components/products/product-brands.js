import React from "react";
//import { Link } from "react-router-dom";

/*export default function BlogItem(){}*/ //Es lo mismo
const ProductBrands = props => {
    const{
        id, 
        name
    } = props.productBrands;
    return(
            <option value={id}>{name}</option>
    );
};
export default ProductBrands