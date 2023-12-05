import React, { Component }  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const ProductsContainer = (props) =>{
    //console.log("Data", props.data); 
    var i = 0;
    const productsList = props.data.map(productItem =>{
            if (props.data.length > 0){
                    return( 
                        <div key={"prod" + productItem.id} className={"product-list-wrapper-" + productItem.b_type_id}>
                            <div className="type-header">    
                            <a className={"product-item-" + productItem.b_type_id} onClick={()=> props.handleEditClick(productItem)}>
                                    <div className={"product-img-background"}
                                    style={{
                                        backgroundImage: "url(" + productItem.img_url + ")"
                                    }}
                                    />
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
                    return(     
                        //header of the jobs 
                        <div key={"prod" + productItem.id} className={"product-list-wrapper-" + productItem.b_type_id}>                                                          
                            <div className="type-header">     
                                <a className={"product-item-" + productItem.b_type_id} onClick={()=> props.handleEditClick(productItem)}>
                                    <div className="product-img">
                                        <img src={productItem.img_url}/>
                                    </div>
                                    <div className="text-content">
                                        <div className="title">{productItem.code}</div>                        
                                        <div className="title">{productItem.name}</div>
                                        <div className="title">{productItem.description}</div>
                                    </div>
                                </a> 
                            </div> 
                        </div>
                    )
*/
