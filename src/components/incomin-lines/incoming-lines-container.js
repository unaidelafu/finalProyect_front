import React, { Component }  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const IncomingLinesContainer = (props) =>{
    //console.log("Data", props.data);   
    const linesList = props.data.map(linesItem =>{
            if (props.data.length > 0){
                    return(     
                        //header of the jobs 
                        <div key={"lines-" + linesItem.id} className={"customer-list-wrapper"}>                                                          
   
                            <div className={"customer-item"}>
                                <div className="text-content">
                                    <div className="title">{linesItem.ih_id}</div> 
                                    <div className="title">{linesItem.bike_code}</div> 
                                    <div className="title">{linesItem.bike_desc}</div>                                                                                                               
                                    <div className="title">{linesItem.work_desc}</div>
                                    <div className="title">{linesItem.product_desc}</div>
                                    <div className="title">{linesItem.employee}</div>
                                    <div className="title">{linesItem.time_start}</div>
                                    <div className="title">{linesItem.time_end}</div>
                                    <div className="title">{linesItem.note}</div>
                                    <div className="title">{linesItem.status}</div>
                                    <div className="actions">
                                        <a className = "action-icon" onClick={()=> props.handleEditClick(linesItem)}>
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
        return <div className="customer-list-wrapper">{linesList}</div>;
};
export default IncomingLinesContainer;