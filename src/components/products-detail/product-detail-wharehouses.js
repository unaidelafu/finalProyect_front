import React from "react";
//import { Link } from "react-router-dom";

/*export default function BlogItem(){}*/ //Es lo mismo
const ProductWharehouses = props => {
    const{
        id, 
        name
    } = props.productWharehouses;
    return(
            <option value={id}>{name}</option>
    );
};
export default ProductWharehouses