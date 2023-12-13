import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import { API_url, API_port } from "../constants/global";
import EmployeesContainer from "../employees/employees-container"
import EmployeeModal from "../modals/employee-modal.js";

export default class Employees extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            employeeList:[],
            allEmployees:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            employeeModalIsOpen: false,
            ownUser: false,
            employeeToEdit: {},
            filter: "",
            nofilter: true            
            
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleNewEmployeeClick = this.handleNewEmployeeClick.bind(this);
        this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
        
        this.clearEmployeeToEdit = this.clearEmployeeToEdit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);

        this.iterateJobGroups = this.iterateJobGroups.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFind = this.handleFind.bind(this);
        
    };
    handleChange(event){      
        this.setState({
            [event.target.name]: event.target.value
            //error_message: ""
        })        
        if(event.target.name === "filter"){
            this.handleFind(event.target.value);
        }
    }

    handleFind(filterValue){
        
        let finalFilter = [];
        if (filterValue !=""){
            let filteredEmployees = [];
            var i = 0;
            this.state.allEmployees.forEach((allEmployeesByType) =>{
                //console.log("employee by type",allEmployeesByType);

                let filteredEmployeeList_sid = allEmployeesByType.filter((employee) => {
                    return employee.sid.toLowerCase().match(filterValue.toLowerCase());
                });    
                let filteredEmployeeList_name1 = allEmployeesByType.filter((employee) => {
                    return employee.name_1.toLowerCase().match(filterValue.toLowerCase());
                });
                let filteredEmployeeList_name2 = allEmployeesByType.filter((employee) => {
                    return employee.name_2.toLowerCase().match(filterValue.toLowerCase());
                });                
                let filteredEmployeeList_phone = allEmployeesByType.filter((employee) => {
                    return employee.phone_num.toLowerCase().match(filterValue.toLowerCase());
                }); 
                filteredEmployees = [...new Set([...filteredEmployeeList_sid, ...filteredEmployeeList_name1])];
                filteredEmployees = [...new Set([...filteredEmployees, ...filteredEmployeeList_name2])];
                filteredEmployees = [...new Set([...filteredEmployees, ...filteredEmployeeList_phone])]; 
                
                if(filteredEmployees.length > 0){
                    finalFilter[i] = [...filteredEmployees];
                    i++;
                }           
            });
        }else{
            finalFilter = [...this.state.allEmployees];
        }
         this.setState({
            employeeList: finalFilter,
            nofilter: false
         })
         
    }    
    clearEmployeeToEdit(){
        this.setState({
            employeeToEdit: {}
        })
    }

    handleSuccessfullNewSubmission(){
        this.getEmployees();
        //handleSuccessfullNewSubmission(newEmployee){
        this.setState({
            employeeModalIsOpen: false
            //---->blogItems: [blog].concat(this.state.blogItems)  //El blog creado, se le concatena los blogs ya existentes, para visualizar todo, el nuevo primero
        })
        
    }

    handleEditClick(employeeItem){
        //console.log("Clicked: ", employeeItem);
        this.setState({
            employeeToEdit: employeeItem,
            employeeModalIsOpen: true
        });
    }   
    handleNewEmployeeClick(){
        //console.log("CLicked!!")
        this.setState({
            employeeModalIsOpen: true
        });
    }
    handleModalClose(){
        this.setState({
            employeeModalIsOpen: false
        });     
    }
    getEmployees(){
        //axios get
        var getEmployeesEndpoint = this.state.apiUrl + "employees";
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getEmployeesEndpoint)
            .then(response => {
                //check the job of the previus person to change the job array of emplyees-container
                if(Object.keys(response.data).length > 0){
                    //Creando array de arrays de objetos
                    var prevJob = "";
                    var preparedResponse = [];
                    var data = [];
                    response.data.map(employeeItem =>{
                        //preparedResponse.push(employeeItem)
                        if(employeeItem.job != prevJob && prevJob != ""){
                            preparedResponse.push(data);
                            data = [];
                        }
                        data.push(employeeItem);
                        employeeItem.prevJob = prevJob;
                        prevJob = employeeItem.job;
                    })
                    preparedResponse.push(data)
                }              
                this.setState({
                    employeeList: [...preparedResponse],
                    allEmployees: [...preparedResponse]
                })
            }).catch(error => {
                this.setState(
                    {
                        errorText: 'An error ocurred' + error
                    }
                )
                this.props.hadleUnsuccessfulAuth();
            });        
    }
    iterateJobGroups(){
        var employees = this.state.employeeList        
        const EmployeeJobTypes = employees.map(employeesForJob =>{
            return(
                <div key={"job" + employeesForJob[0].job_id} className="employees-grid-wrapper">
                    <div className="employee-job">{employeesForJob[0].job + "s"}</div>
                    <EmployeesContainer
                    data={employeesForJob}   
                    handleEditClick={this.handleEditClick}     
                    //handleDeleteClick = {this.handleDeleteClick}
                    />
                </div>
            );
        })
        return EmployeeJobTypes
    }

    componentDidMount(){
        this.getEmployees();
    }

    render(){
        return(
            <div className="employee-manager-wrapper"> 
                <EmployeeModal
                    handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
                    handleModalClose={this.handleModalClose}            
                    modalIsOpen = {this.state.employeeModalIsOpen} 
                    employeeToEdit = {this.state.employeeToEdit}
                    ownUser = {this.state.ownUser}
                    clearEmployeeToEdit = {this.clearEmployeeToEdit}/>
                
                <div className="new-employee-link">
                    <div className="gap"></div>
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewEmployeeClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                    <div className="find-wrapper">
                        <input
                        type="text"
                        name="filter"
                        placeholder="Find Name, Sid, Phone"
                        value={this.state.filter}
                        onChange={this.handleChange}></input>
                    </div>                     
                </div>
               
                {this.iterateJobGroups()}
                
            </div>
        );
    }    
}
