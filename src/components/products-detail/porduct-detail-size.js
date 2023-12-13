import React from "react";
//import { Link } from "react-router-dom";

/*export default function BlogItem(){}*/ //Es lo mismo
const ProductSizes = props => {
    const{
        id, 
        name
    } = props.productSizes;
    return(
            <option value={name}>{name}</option>
    );
};
export default ProductSizes