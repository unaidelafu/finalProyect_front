import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { API_url, API_port } from "../constants/global";
import CustomersContainer from "../customers/customers-container.js"
import CustomerModal from "../modals/customer-modal.js";
import IncomingHeadersContainer from "../incoming-headers/incoming-headers-container.js";
import IncomingLinesContainer from "../incomin-lines/incoming-lines-container.js";
import WorkMenu from "../work-menu/work-menu";

export default class WorkWindow extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            dataList:[],
            allCustomers:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            customerModalIsOpen: false,
            customerToEdit: {},
            filter: "",
            errorText: "",
            dataToFind: "Lines",
            statusToFind: "",
            nofilter: true
        };
        this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
        this.handleSuccessfullEditSubmission = this.handleSuccessfullEditSubmission.bind(this);
        this.handleSuccessfullDelete = this.handleSuccessfullDelete.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        //this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNewCustomerClick = this.handleNewCustomerClick.bind(this);
        this.handleFind = this.handleFind.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.clearCustomerToEdit = this.clearCustomerToEdit.bind(this);
        //this.search_customers = this.search_customers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.get_data = this.get_data.bind(this);
        this.containerSelected = this.containerSelected.bind(this);
        this.handleTableSelected = this.handleTableSelected.bind(this);
    };

    handleTableSelected(dataToFind,statusToFind){
        console.log("data to find:", dataToFind, statusToFind);
        this.setState({
            dataToFind: dataToFind,
            statusToFind: statusToFind
        });
        //todo: 
        //Clear data.
        //
        this.get_data(dataToFind, statusToFind);
    }
    clearCustomerToEdit(){
        this.setState({
            customerToEdit: {}
        });
    }
    handleModalClose(){
        console.log("Closing");       
        this.setState({
            customerModalIsOpen: false
        });     
    }
    handleSuccessfullNewSubmission(customer){
        //handleSuccessfullNewSubmission(newEmployee){
            console.log("New customer:", customer);
            console.log("Los customers:", this.state.customerList);
        
        this.setState({
            customerModalIsOpen: false,
            customerList: [customer].concat(this.state.customerList)  
            //El customer creado, se le concatena los customer ya existentes, para visualizar todo, el nuevo primero
        });

    }
    handleSuccessfullEditSubmission(customer){
        console.log("Edited customer:", customer);
        console.log("Los customers:", this.state.customerList);
        var oldCustomerList = [...this.state.customerList]
        var foundIndex = oldCustomerList.findIndex(x => x.id == customer.id); 
        oldCustomerList[foundIndex] = customer   
        this.setState({
            customerModalIsOpen: false,
            customerList: [...oldCustomerList]
        });       
    }
    handleSuccessfullDelete(customerid){
        var oldCustomerList = [...this.state.customerList]
        var foundIndex = oldCustomerList.findIndex(x => x.id == customerid); 
        oldCustomerList.splice(foundIndex, 1);  //deleting de customer from array
        this.setState({
            customerModalIsOpen: false,
            customerList: [...oldCustomerList]
        });               
    }

    handleEditClick(customerItem){
        console.log("Clicked: ", customerItem);
        this.setState({
            customerToEdit: customerItem,
            customerModalIsOpen: true
        });
    }   
    handleFind(filterValue){

        console.log("Finding customer:", filterValue);

        console.log("All customers", this.state.allCustomers, this.state.nofilter);
        
        let filteredCustomers = [];
        let filteredCustomers_city = this.state.allCustomers.filter((customer) => {
            return customer.city.toLowerCase().match(filterValue.toLowerCase());
        })    
        let filteredCustomers_name1 = this.state.allCustomers.filter((customer) => {
            return customer.name_1.toLowerCase().match(filterValue.toLowerCase());
        })
        let filteredCustomers_name2 = this.state.allCustomers.filter((customer) => {
            return customer.name_2.toLowerCase().match(filterValue.toLowerCase());
        })
    
         console.log("Filtered name1:", filteredCustomers_name1);
         console.log("Filtered name2:", filteredCustomers_name2);
         console.log("Filtered city", filteredCustomers_city);

         filteredCustomers = [...new Set([...filteredCustomers_city, ...filteredCustomers_name1])];
         filteredCustomers = [...new Set([...filteredCustomers, ...filteredCustomers_name2])];



         //filteredCustomers.sort();

         console.log("Filtered", filteredCustomers);
         this.setState({
            customerList: filteredCustomers,
            nofilter: false
         })
    }
    handleNewCustomerClick(){
        console.log("CLicked!!");
        
        this.setState({
            customerModalIsOpen: true
        });
        
    }
    get_data(dataToFind, statusToFind){
        //var dataToFind = this.state.dataToFind;
        //var statusToFind = this.state.statusToFind;
        console.log("El status", statusToFind);
        var apiUrl_end = "";
        if (dataToFind == "Headers"){
            if (statusToFind == ""){
                apiUrl_end = "incoming_headers";
            }else{
                apiUrl_end = "incoming_headers/" + statusToFind;
            }
        }else if(dataToFind == "Lines"){
            if (statusToFind == ""){
                apiUrl_end = "incoming_lines";
            }else{
                apiUrl_end = "incoming_lines/" + statusToFind;
            }            
        }

        //axios get
        var getDataEndpoint = this.state.apiUrl + apiUrl_end;
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getDataEndpoint)
            .then(response => {
                console.log("Data:", response.data);
                if(Object.keys(response.data).length > 0){
                    this.setState({
                        dataList: [...response.data],
                        allData: [...response.data]
                    });
                }              
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
    handleChange(event){      
        this.setState({
            [event.target.name]: event.target.value
            //error_message: ""
        })        
        if(event.target.name === "filter"){
            this.handleFind(event.target.value);
        }
    }

    componentDidMount(){
        this.get_data();
        console.log("Did mount!!");
      }
    containerSelected(){
        var dataToFind = this.state.dataToFind;
        var containerSelected = null;
        if (dataToFind == "Headers"){
            //Return header container
            //containerSelected = <div>Holi Headers</div>;
            containerSelected = <IncomingHeadersContainer
            data={this.state.dataList}   
            handleEditClick={this.handleEditClick}     
            /> 
        }else if(dataToFind == "Lines"){
            //Return Lines container
            containerSelected = <IncomingLinesContainer
            data={this.state.dataList}   
            handleEditClick={this.handleEditClick}     
            /> 
        }

        return (containerSelected);
    }
    /*
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
    }*/
    render(){
        return(
            <div>
                  <WorkMenu
                    handleTableSelected = {this.handleTableSelected}
                  />                          
                <div className="work-window-manager-wrapper"> 
                    <CustomerModal
                        handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
                        handleSuccessfullEditSubmission = {this.handleSuccessfullEditSubmission}
                        handleSuccessfullDelete = {this.handleSuccessfullDelete}
                        handleModalClose={this.handleModalClose}            
                        modalIsOpen = {this.state.customerModalIsOpen} 
                        customerToEdit = {this.state.customerToEdit}
                        clearCustomerToEdit = {this.clearCustomerToEdit}/>                      
                    <div className="new-work-window-link">
                        <div className="gap"></div>
                        <div className="actions">
                            <a className = "action-icon" onClick={this.handleNewCustomerClick}>
                                <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                        </div>
                        <div className="find-wrapper">
                            <input
                            type="text"
                            name="filter"
                            placeholder="Find Customer or City"
                            value={this.state.filter}
                            onChange={this.handleChange}></input>
                        </div>
                    </div>  
                    {this.containerSelected()}           
                </div>
            </div>
        );
    }    
}
/*
                <CustomersContainer
                    data={this.state.customerList}   
                    handleEditClick={this.handleEditClick}     
                /> 
*/
