import React, { Component }  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const CustomersContainer = (props) =>{
    //console.log("Data", props.data);   
    const customersList = props.data.map(customersItem =>{
            if (props.data.length > 0){
                    return(     
                        //header of the jobs 
                        <div key={"cus" + customersItem.id} className={"customer-list-wrapper-" + customersItem.job_id}>                                                          
                            <div className="job-header">     
                                <a className={"customer-item-" + customersItem.job_id} onClick={()=> props.handleEditClick(customersItem)}>
                                    <div className="text-content">
                                        <div className="title">{customersItem.name_1 + " " + customersItem.name_2}</div>                        
                                        <div className="title">{customersItem.phone_num}</div>
                                        <div className="title">{customersItem.mail}</div>
                                        <div className="title">{customersItem.city}</div>
                                        <div className="actions">
                                            <a className = "action-icon" onClick={()=> props.handleEditClick(portfolioItem)}>
                                                <FontAwesomeIcon icon="edit" />
                                            </a>
                                            <a className = "action-icon" onClick={()=> props.handleDeleteClick(portfolioItem)}>
                                                <FontAwesomeIcon icon="trash" />
                                            </a>
                                        </div>                                        
                                    </div>
                                </a> 
                            </div> 
                        </div>
                    )
            }else{
                <div  key="0" className="employee-item"> No data to show</div>  
            }
        });
        return <div className="employee-list-wrapper">{customersList}</div>;
};
export default CustomersContainer;