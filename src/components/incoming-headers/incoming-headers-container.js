import React, { Component }  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const IncomingHeadersContainer = (props) =>{
    //console.log("Data", props.data);   
    const headersList = props.data.map(headersItem =>{
            if (props.data.length > 0){
                    return(     
                        //header of the jobs 
                        <div key={"header-" + headersItem.id} className={"customer-list-wrapper"}>                                                          
   
                            <div className={"customer-item"}>
                                <div className="text-content">
                                    <div className="title">{headersItem.id}</div> 
                                    <div className="title">{headersItem.client}</div>                        
                                    <div className="title">{headersItem.employee}</div>
                                    <div className="title">{headersItem.note}</div>
                                    <div className="title">{headersItem.price}</div>
                                    <div className="title">{headersItem.date_in}</div>
                                    <div className="title">{headersItem.date_out}</div>
                                    <div className="title">{headersItem.status}</div>
                                    <div className="actions">
                                        <a className = "action-icon" onClick={()=> props.handleEditClick(headersItem)}>
                                            <FontAwesomeIcon icon="edit" />
                                        </a>
                                    </div>                                        
                                </div>
                            </div> 

                        </div>
                    )
            }else{
                <div  key="0" className="customer-item"> No data to show</div>  
            }
        });
        return <div className="customer-list-wrapper">{headersList}</div>;
};
export default IncomingHeadersContainer;