import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import { API_url, API_port } from "../constants/global";
import ProductsContainer from "../products/products-container";
import ProductModal from "../modals/product-modal.js";
import ProductsDetailContainer from "../products-detail/products-detail-container";

export default class InventoryDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentId: this.props.match.params.slug,
            productItem: {},    //Response of the API
            apiUrl: API_url + ":" + API_port + "/",
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            productModalIsOpen: false,
            productToEdit: {},
            productList:[],
            allProducts:[]

        }
        this.getProductHeader = this.getProductHeader.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleNewProductClick = this.handleNewProductClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearProductToEdit = this.clearProductToEdit.bind(this);
    }
    getProductHeader(){
        if (this.state.productList.length > 0){
            return(
                <div className="product-detail-header">
                    <div className="title">{this.state.productList[0].code}</div>
                    <div className="title">{this.state.productList[0].name}</div>
                    <div className="title">{this.state.productList[0].b_name}</div>
                    <div className="title">{this.state.productList[0].price}</div>
                </div>
            );
        }
    }
    handleModalClose(){
        this.setState({
            productModalIsOpen: false
        });     
    }
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
    handleNewProductClick(){
        this.setState({
            productModalIsOpen: true
        });
    }
    handleEditClick(customerItem){
        console.log("Clicked: ", customerItem);
        this.setState({
            productToEdit: customerItem,
            productModalIsOpen: true
        });
    } 
    getProductItem(){

        //axios get
        var getProductsEndpoint = this.state.apiUrl + "stock/" + this.state.currentId
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getProductsEndpoint)
            .then(response => {
                console.log("Product:", response.data);
                if(Object.keys(response.data).length > 0){
                    this.setState({
                        productList: [...response.data],
                        allProducts: [...response.data]
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
        this.getProductItem();
    }
    render(){
        return(
            <div className="product-detail-container"> 
                {<ProductModal
                    handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
                    handleModalClose={this.handleModalClose}            
                    modalIsOpen = {this.state.productModalIsOpen} 
                    productToEdit = {this.state.productToEdit}
                    clearProductToEdit = {this.clearProductToEdit}/>}            
                {this.getProductHeader()}
                <div className="new-product-link">
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewProductClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                </div>
                <ProductsDetailContainer
                    data={this.state.productList}   
                    handleEditClick={this.handleEditClick}     
                />     
            </div>
        )
    }
}