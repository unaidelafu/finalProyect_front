import React, { Component }  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const EmployeesContainer = (props) =>{
    //console.log("Data", props.data);   
    var i = 0;
    const employeesList = props.data.map(employeeItem =>{
            if (props.data.length > 0){
                    return(     
                        //header of the jobs 
                        <div key={"emp" + employeeItem.id} className={"employee-list-wrapper-" + employeeItem.job_id}>                                                          
                            <div className="job-header">     
                                <a className={"employee-item-" + employeeItem.job_id} onClick={()=> props.handleEditClick(employeeItem)}>
                                    <div className="employee-img">
                                        <img src={employeeItem.img_url}/>
                                    </div>
                                    <div className="text-content">
                                        <div className="title">{employeeItem.name_1 + " " + employeeItem.name_2}</div>                        
                                        <div className="title">{employeeItem.phone_num}</div>
                                    </div>
                                </a> 
                            </div> 
                        </div>
                    )
                    i++;
            }else{
                <div  key="0" className="employee-item"> No data to show</div>  
            }
        });
        return <div className="employee-list-wrapper">{employeesList}</div>;
};
export default EmployeesContainer;
