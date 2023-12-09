import React from "react";
//import { Link } from "react-router-dom";

/*export default function BlogItem(){}*/ //Es lo mismo
const ProductTypes = props => {
    const{
        id, 
        name
    } = props.productTypes;
    return(
            <option value={id}>{name}</option>
    );
};
export default ProductTypes