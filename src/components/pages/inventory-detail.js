import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import { API_url, API_port } from "../constants/global";

import ProductModal from "../modals/product-modal.js";
import ProductsDetailContainer from "../products-detail/products-detail-container";
import ProductDetailModal from "../modals/product-detail-modal.js";

export default class InventoryDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentId: this.props.match.params.slug,
            mp_id: this.props.match.params.slug,
            productItem: {},    //Response of the API
            apiUrl: API_url + ":" + API_port + "/",
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            productModalIsOpen: false,
            productToEdit: {},
            productList:[],
            allProducts:[],
            filter: "",
            nofilter: true

        }
        this.getProductHeader = this.getProductHeader.bind(this);
        this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleNewProductClick = this.handleNewProductClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearProductToEdit = this.clearProductToEdit.bind(this);
        this.getProductItem = this.getProductItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFind = this.handleFind.bind(this);
    }
    handleFind(filterValue){

        console.log("Finding product-detail:", filterValue);

        console.log("All customers", this.state.allProducts, this.state.nofilter);
        
        let filteredProducts = [];
        let filteredProducts_whare = this.state.allProducts.filter((product) => {
            return product.w_name.toLowerCase().match(filterValue.toLowerCase());
        })    
        let filteredProducts_desc = this.state.allProducts.filter((product) => {
            return product.description.toLowerCase().match(filterValue.toLowerCase());
        })
        let filteredProducts_size = this.state.allProducts.filter((product) => {
            return product.size.toLowerCase().match(filterValue.toLowerCase());
        })        

    
         console.log("Filtered desc:", filteredProducts_desc);
         console.log("Filtered size:", filteredProducts_size);
         console.log("Filtered whare", filteredProducts_whare);

         filteredProducts = [...new Set([...filteredProducts_whare, ...filteredProducts_desc])];
         filteredProducts = [...new Set([...filteredProducts, ...filteredProducts_size])];



         //filteredCustomers.sort();

         console.log("Filtered", filteredProducts);
         this.setState({
            productList: filteredProducts,
            nofilter: false
         })
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
    getProductHeader(){
        if (this.state.productList.length > 0){
            return(
                <div className="product-detail-header">
                    <div className="title">{this.state.productList[0].code}</div>
                    <div className="title2">{this.state.productList[0].b_name}</div>
                    <div className="title">{this.state.productList[0].name}</div>                   
                    <div className="title2">{this.state.productList[0].price + "€"}</div>
                </div>
            );
        }else{
            return(
                <div className="product-detail-header">
                    <div className="title">No product to show, please add new product</div>
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
        this.getProductItem();
        //handleSuccessfullNewSubmission(newEmployee){
        console.log("Estamos en inventory");
        this.setState({
            productModalIsOpen: false
            //---->blogItems: [blog].concat(this.state.blogItems)  //El blog creado, se le concatena los blogs ya existentes, para visualizar todo, el nuevo primero
        });
        console.log("Despues del setstate");
        
    }  
    handleNewProductClick(){
        this.setState({
            productModalIsOpen: true,
            mp_id: this.state.currentId
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
                {<ProductDetailModal
                    handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
                    handleModalClose={this.handleModalClose}            
                    modalIsOpen = {this.state.productModalIsOpen} 
                    productToEdit = {this.state.productToEdit}
                    mp_id = {this.state.mp_id}
                    clearProductToEdit = {this.clearProductToEdit}/>} 
                                           
                <div className="new-product-link">
                    
                    {this.getProductHeader()}
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewProductClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                    <div className="find-wrapper">
                        <input
                        type="text"
                        name="filter"
                        placeholder="Find Product, Wharehouse or Size"
                        value={this.state.filter}
                        onChange={this.handleChange}></input>
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