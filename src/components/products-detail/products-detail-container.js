import React, { Component }  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const ProductsDetailContainer = (props) =>{
    //console.log("Data", props.data);   
    const productsList = props.data.map(productsItem =>{
            if (props.data.length > 0){
                    return(     
                        //header of the jobs 
                        <div key={"proddtl" + productsItem.id} className={"product-detail-list-wrapper"}>                                                          
                            <div className={"product-detail-item"}>
                                <div className="text-content">
                                    <div className="title">{productsItem.w_name}</div>                        
                                    <div className="title">{productsItem.name}</div>
                                    <div className="title">{productsItem.description}</div>
                                    <div className="title">{productsItem.size}</div>
                                    <div className="title">{productsItem.qty}</div>                                  
                                    <div className="actions">
                                        <a className = "action-icon" onClick={()=> props.handleEditClick(productsItem)}>
                                            <FontAwesomeIcon icon="edit" />
                                        </a>
                                    </div>                                        
                                </div>
                            </div> 

                        </div>
                    )
            }else{
                <div  key="0" className="product-detail-item"> No data to show</div>  
            }
        });
        return <div className="product-detail-list-wrapper">{productsList}</div>;
};
export default ProductsDetailContainer;