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
                                <div className={"employee-item-" + employeeItem.job_id}>
                                    <div className="employee-img">
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
                    i++;
            }else{
                <div  key="0" className="employee-item"> No data to show</div>  
            }
        });
        return <div className="employee-list-wrapper">{employeesList}</div>;
};
export default EmployeesContainer;






/* //class component:
export default class EmployeesContainer extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            currentPage: 0,
            employeeModalIsOpen: false
        };
        //this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    };
    handleEditClick(){
        console.log("Clicked")
        this.setState({
            employeeModalIsOpen: true
        });
    }
    render(){
        var i = 0;
        const employeesList = this.props.data.map(employeeItem =>{
                if (this.props.data.length > 0){
                        return(     
                            //header of the jobs
                            <div key={"emp" + employeeItem.id} className={"employee-list-wrapper-" + employeeItem.job_id}>                                                          
                                <div className="job-header">     
                                    <div className={"employee-item-thumb-" + employeeItem.job_id}>
                                        <div className="employee-thumb-img">
                                            <img src={employeeItem.img_url}/>
                                        </div>
                                        <div className="text-content">
                                            <div className="title">{employeeItem.name_1 + " " + employeeItem.name_2}</div>
                                            <div className="job">{employeeItem.job}</div>
                                            <div className="actions">
                                                <a className = "action-icon" onClick={()=> this.handleEditClick(employeeItem)}>
                                                    <FontAwesomeIcon icon="edit" />
                                                </a>
                                                <a className = "action-icon" onClick={()=> this.handleDeleteClick(employeeItem)}>
                                                    <FontAwesomeIcon icon="trash" />
                                                </a>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            </div>
                        )
                        i++;
                }else{
                    <div  key="0" className="employee-item-thumb"> No data to show</div>  
                }
            });
            return <div className="employee-list-wrapper">{employeesList}</div>;
    }    
}
*/