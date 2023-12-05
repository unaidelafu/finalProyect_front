import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import { API_url, API_port } from "../constants/global";
import ProductsContainer from "../products/products-container";
import ProductModal from "../modals/product-modal.js";

export default class Inventory extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            BBDDItems:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            productModalIsOpen: false,
            productToEdit: {}
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleNewProductClick = this.handleNewProductClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearProductToEdit = this.clearProductToEdit.bind(this);
        this.iterateTypesGroups = this.iterateTypesGroups.bind(this);

    };
    clearProductToEdit(){
        this.setState({
            productToEdit: {}
        })       
    }
    handleSuccessfullNewSubmission(){
        //-->this.get_products();
        //handleSuccessfullNewSubmission(newEmployee){
        this.setState({
            productModalIsOpen: false
            //---->blogItems: [blog].concat(this.state.blogItems)  //El blog creado, se le concatena los blogs ya existentes, para visualizar todo, el nuevo primero
        })
        
    }   

    handleEditClick(productItem){
        //console.log("Clicked: ", employeeItem);
        this.setState({
            productToEdit: productItem,
            productModalIsOpen: true
        });
    }   
    handleNewProductClick(){
        //console.log("CLicked!!")
        this.setState({
            productModalIsOpen: true
        });
    }
    handleModalClose(){
        this.setState({
            productModalIsOpen: false
        });     
    }



    get_products(){
        //axios get
        var getProductsEndpoint = this.state.apiUrl + "products"
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getProductsEndpoint)
            .then(response => {
                /*
                console.log("Products!!");
                console.log("response", response);
                */
                 //check the job of the previus person to change the job array of emplyees-container
                 if(Object.keys(response.data).length > 0){
                    //Creando array de arrays de objetos
                    var prevType = "";
                    var preparedResponse = [];
                    var data = [];
                    response.data.map(productItem =>{
                        //preparedResponse.push(employeeItem)
                        if(productItem.b_type != prevType && prevType != ""){
                            preparedResponse.push(data);
                            data = [];
                        }
                        data.push(productItem);
                        productItem.prevType = prevType;
                        prevType = productItem.b_type;
                    })
                    preparedResponse.push(data)
                }        
                //console.log("Prepared response:", preparedResponse);      
                this.setState({
                    BBDDItems: [...preparedResponse]
                })              

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

    iterateTypesGroups(){
        var products = this.state.BBDDItems;        
        console.log("Products:", products);
        const ProductTypes = products.map(productsForType =>{
            return(
                <div key={"type" + productsForType[0].b_type_id} className="products-grid-wrapper">
                    <div className="product-type">{productsForType[0].b_type}</div>
                    <ProductsContainer
                    data={productsForType}   
                    handleEditClick={this.handleEditClick}     
                    //handleDeleteClick = {this.handleDeleteClick}
                    />
                </div>
            );
        })
        return ProductTypes
    }    

    componentDidMount(){
        this.get_products();
      }
    render(){
        return(
            <div className="product-manager-wrapper"> 
                {<ProductModal
                    handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
                    handleModalClose={this.handleModalClose}            
                    modalIsOpen = {this.state.productModalIsOpen} 
                    productToEdit = {this.state.productToEdit}
                    clearProductToEdit = {this.clearProductToEdit}/>}
                
                <div className="new-product-link">
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewProductClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                </div>
                {this.iterateTypesGroups()}
                
            </div>
        );
    }    
}
