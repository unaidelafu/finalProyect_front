import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { API_url, API_port } from "../constants/global";
import CustomersContainer from "../customers/customers-container.js"
import CustomerModal from "../modals/customer-modal.js";

export default class Customers extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            customerList:[],
            allCustomers:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            customerModalIsOpen: false,
            customerToEdit: {},
            filter: "",
            errorText: "",
            nofilter: true
        };
        this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
        this.handleSuccessfullEditSubmission = this.handleSuccessfullEditSubmission.bind(this);
        this.handleSuccessfullDelete = this.handleSuccessfullDelete.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        //this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNewCustomerClick = this.handleNewCustomerClick.bind(this);
        this.handleFindCustomer = this.handleFindCustomer.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.clearCustomerToEdit = this.clearCustomerToEdit.bind(this);
        //this.search_customers = this.search_customers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    };

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
    handleFindCustomer(filterValue){
        /*
        let filteredCountries = countries.filter((country) => {
            return country.name.match(searchInput.toLowerCase());
         });
*/

        console.log("Finding customer:", filterValue);
        /*
        if(this.state.nofilter === true){
            this.setState({
                allCustomers: [...this.state.customerList]
            })
        }
        */
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
    get_customers(){
        //axios get
        var getCustomersEndpoint = this.state.apiUrl + "customers";
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getCustomersEndpoint)
            .then(response => {
                console.log("Customers:", response.data);
                if(Object.keys(response.data).length > 0){
                    this.setState({
                        customerList: [...response.data],
                        allCustomers: [...response.data]
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
            this.handleFindCustomer(event.target.value);
        }
    }

    componentDidMount(){
        this.get_customers();
      }
    render(){
        return(
            <div className="customer-manager-wrapper"> 
                 <CustomerModal
                    handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
                    handleSuccessfullEditSubmission = {this.handleSuccessfullEditSubmission}
                    handleSuccessfullDelete = {this.handleSuccessfullDelete}
                    handleModalClose={this.handleModalClose}            
                    modalIsOpen = {this.state.customerModalIsOpen} 
                    customerToEdit = {this.state.customerToEdit}
                    clearCustomerToEdit = {this.clearCustomerToEdit}/>                           
                <div className="new-customer-link">
                    <div className="gap"></div>
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewCustomerClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                    <div className="find-wrapper">
                        <input
                        type="text"
                        name="filter"
                        placeholder="Find Customer"
                        value={this.state.filter}
                        onChange={this.handleChange}></input>
                    </div>
                </div>  
                <CustomersContainer
                    data={this.state.customerList}   
                    handleEditClick={this.handleEditClick}     
                />             
            </div>
        );
    }    
}
