import React, {Component} from "react";
import axios from "axios";
import { API_url, API_port } from "../constants/global";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import EmployeesContainer from "../employees/employees-container"
//import Home from "../pages/home"
import EmployeeModal from "../modals/employee-modal.js";

export default class Employees extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            BBDDItems:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            employeeModalIsOpen: false,
            ownUser: false,
            employeeToEdit: {},
            
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleNewEmployeeClick = this.handleNewEmployeeClick.bind(this);
        this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
        
        this.clearEmployeeToEdit = this.clearEmployeeToEdit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);

        this.iterateJobGroups = this.iterateJobGroups.bind(this);
        
    };

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
        console.log("Clicked: ", employeeItem)
        this.setState({
            employeeToEdit: employeeItem,
            employeeModalIsOpen: true
        })
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
        var getEmployeesEndpoint = this.state.apiUrl + "employees"
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getEmployeesEndpoint)
            .then(response => {
                //Add the job of the previus person to Print the job on the header of emplyees-container
                if(Object.keys(response.data).length > 0){
                    //Creando array de arrays de objetos
                    var prevJob = "";
                    var preparedResponse = []
                    var data = []
                    var employeeObj = {}
                    const iterated = response.data.map(employeeItem =>{
                        //preparedResponse.push(employeeItem)
                        if(employeeItem.job != prevJob && prevJob != ""){
                            preparedResponse.push(data);
                            data = [];
                        }
                        data.push(employeeItem);
                        employeeItem.prevJob = prevJob
                        prevJob = employeeItem.job
                    })
                    preparedResponse.push(data)
                }              
                this.setState({
                    BBDDItems: [...preparedResponse]
                })
                //console.log("BBDD_items:", this.state.BBDDItems);
            }).catch(error => {
                console.log("Some error occurred", error)
                this.setState(
                    {
                        errorText: 'An error ocurred' + error
                    }
                )
                this.props.hadleUnsuccessfulAuth();
            });        
    }
    iterateJobGroups(){
        var employees = this.state.BBDDItems        
        const EmployeeJobTypes = employees.map(employeesForJob =>{
            //console.log("Employees for job:", employeesForJob )
            return(
                <div className="employees-grid-wrapper">
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
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewEmployeeClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                </div>
                {this.iterateJobGroups()}
                
            </div>
        );
    }    
}
