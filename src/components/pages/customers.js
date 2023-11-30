import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { API_url, API_port } from "../constants/global";
import CustomersContainer from "../customers/customers-container.js"
import CustomeModal from "../modals/customer-modal.js";

export default class Customers extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            BBDDItems:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            customerModalIsOpen: false,
            customerToEdit: {},
            errorText: ""
        };
        this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNewCustomerClick = this.handleNewCustomerClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.clearCustomerToEdit = this.clearCustomerToEdit.bind(this);
        this.apiDel = this.apiDel.bind(this);
        
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
    handleSuccessfullNewSubmission(){
        //this.getEmployees();
        //handleSuccessfullNewSubmission(newEmployee){
        this.setState({
            customerModalIsOpen: false
            //---->blogItems: [blog].concat(this.state.blogItems)  //El blog creado, se le concatena los blogs ya existentes, para visualizar todo, el nuevo primero
        });
        
    }

    apiDel(customerItem){
        //App API
        var customerEndpoint = this.state.apiUrl + "customer/" + customerItem.id
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            });
            axiosInstance
            .delete(customerEndpoint)
            .then(resp =>{
                console.log("BBDD api response", resp);   
                if(resp.data.status == "ERROR"){
                    this.setState({
                        errorText: resp.data.message
                    })
                  }else{
                      //Wait the response to close            
                      this.modalClose();
                      }   
            }).catch(error => {
                    this.setState({
                        errorText: resp.data.message
                    })                    
            });         
  }


    handleDeleteClick(customerItem){
        //TODO
        this.apiDel(customerItem);
    }
    handleEditClick(customerItem){
        console.log("Clicked: ", customerItem);
        this.setState({
            customerToEdit: customerItem,
            customerModalIsOpen: true
        });
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
                        BBDDItems: [...response.data]
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

    componentDidMount(){
        this.get_customers();
      }
    render(){
        return(
            <div className="customer-manager-wrapper"> 
                 <CustomeModal
                    handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
                    handleModalClose={this.handleModalClose}            
                    modalIsOpen = {this.state.customerModalIsOpen} 
                    customerToEdit = {this.state.customerToEdit}
                    clearCustomerToEdit = {this.clearCustomerToEdit}/>                           
                <div className="new-customer-link">
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewCustomerClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                </div>  
                <CustomersContainer
                    data={this.state.BBDDItems}   
                    handleEditClick={this.handleEditClick}     
                    handleDeleteClick = {this.handleDeleteClick}
                />             
            </div>
        );
    }    
}
