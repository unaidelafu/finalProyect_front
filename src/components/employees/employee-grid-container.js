import React, { Component }  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
//import ErrorBoundary from "../errors/error-boundary.js"

const employeesGridContainer = (props) =>{
    console.log("Data en grid:", props.data);   
    var i = 0;
    const employeesList = props.data.map(employeeItem =>{
            if (props.data.length > 0){
                /*if (employeeItem.prevJob === employeeItem.job){*/
                    return(     
                        //header of the jobs
                        <div key={"emp" + employeeItem.id} className={"employee-list-wrapper-" + employeeItem.job_id}>                                                          
                            <div className="job-header">
                            {i === 0?
                            (employeeItem.job + "s" + "\n"): null}      
                                <div className={"employee-item-thumb-" + employeeItem.job_id}>
                                    <div className="employee-thumb-img">
                                        <img src={employeeItem.img_url}/>
                                    </div>
                                    <div className="text-content">
                                        <div className="title">{employeeItem.name_1 + " " + employeeItem.name_2}</div>
                                        <div className="job">{employeeItem.job}</div>
                                        <div className="actions">
                                            <a className = "action-icon" onClick={()=> props.handleEditClick(employeeItem)}>
                                                <FontAwesomeIcon icon="edit" />
                                            </a>
                                            <a className = "action-icon" onClick={()=> props.handleDeleteClick(employeeItem)}>
                                                <FontAwesomeIcon icon="trash" />
                                            </a>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    )
                    /*
                }else{
                    return(<div  key={"gap" + employeeItem.id} className="empty-field">
                        <div className="job-header">{employeeItem.job + "s"}</div>
                    </div>)
                }    
                */     
            }else{
                <div  key="0" className="employee-item-thumb"> No data to show</div>  
            }
            i++;
        }
        );
        return <div className="employee-list-wrapper">{employeesList}</div>;
    //return <div className="employee-list-top-wrapper">{employeesList}</div>;
};
export default employeesGridContainer;
