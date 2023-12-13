import React, { Component }  from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const ProductsContainer = (props) =>{
    //console.log("Data", props.data); 
    var i = 0;
    const productsList = props.data.map(productItem =>{
            if (props.data.length > 0){
                    return( 
                        <div key={"prod" + productItem.mp_id} className={"product-item-wrapper"}> 
                            <Link to={`/inv/${productItem.mp_id}`}>
                                    <div className={"product-img-background"}
                                    style={{
                                        backgroundImage: "url(" + productItem.img_url + ")"
                                    }}>
                                    </div>
                                    
                                    <div className="img-text-wrapper">
                                        <div className="logo-wrapper">
                                            {productItem.code} - {productItem.name}
                                        </div>
                                        <div className="subtitle">
                                            <div>{productItem.b_name}</div>
                                        </div>
                                    </div>                                                  
                                </Link>  
                                <div className="actions">
                                    <a className = "action-icon-edit" onClick={()=> props.handleEditClick(productItem)}>
                                        <FontAwesomeIcon icon="edit" />
                                    </a>
                                    <a className = "action-icon-delete" onClick={()=> props.handleDeleteClick(productItem)}>
                                        <FontAwesomeIcon icon="trash" />
                                    </a>                            
                                </div>                      
                        </div>   
                    )
                    i++;
            }else{
                <div  key="0" className="product-item"> No data to show</div>  
            }
        });
        return <div className="product-list-wrapper">{productsList}</div>;
};
export default ProductsContainer;

/*
                            <a className={"product-item"} onClick={()=>props.handleEditClick(productItem)}>
                                    <div className={"product-img-background"}>
                                        <img src={productItem.img_url}/>
                                    </div>
                                    
                                    <div className="img-text-wrapper">
                                        <div className="logo-wrapper">
                                            {productItem.name}
                                        </div>
                                        <div className="subtitle">
                                            <div>{productItem.code}</div>
                                            <div>{productItem.description}</div>
                                        </div>
                                    </div>                                                  
                                </a>  
*/
