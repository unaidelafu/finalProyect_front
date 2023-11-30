import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { API_url, API_port } from "../constants/global";
import CustomersContainer from "../customers/customers-container.js"
import EmployeeModal from "../modals/employee-modal.js";

export default class Customers extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            API_endpoint: API_url + ":" + API_port + "/",
            BBDDItems:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            customerModalIsOpen: false,
            customerToEdit: {},
            errorText: ""
        };

        this.handleEditClick = this.handleEditClick.bind(this);
    };
    handleEditClick(customerItem){
        //console.log("Clicked: ", employeeItem);
        this.setState({
            customerToEdit: customerItem,
            customerModalIsOpen: true
        });
    }   
    get_customers(){
        //axios get
        var getCustomersEndpoint = this.state.API_endpoint + "customers"
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
                        BBDDItems: [...response.data]
                    })
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

    componentDidMount(){
        this.get_customers();
      }
    render(){
        return(
            <div className="customer-manager-wrapper">                 
                <div className="new-customer-link">
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewEmployeeClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                </div>  
                <CustomersContainer
                    data={this.state.BBDDItems}   
                    handleEditClick={this.handleEditClick}     
                    //handleDeleteClick = {this.handleDeleteClick}
                    />             
            </div>
        );
    }    
}
