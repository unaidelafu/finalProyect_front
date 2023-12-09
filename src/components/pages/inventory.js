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
            productList:[],
            allProducts:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            productModalIsOpen: false,
            productToEdit: {},
            filter: "",
            nofilter: true
        };
        this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleNewProductClick = this.handleNewProductClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.clearProductToEdit = this.clearProductToEdit.bind(this);
        this.iterateTypesGroups = this.iterateTypesGroups.bind(this);
        this.get_products = this.get_products.bind(this);
        this.apiDel = this.apiDel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFind = this.handleFind.bind(this);

    };
    clearProductToEdit(){
        this.setState({
            productToEdit: {}
        })       
    }
    handleSuccessfullNewSubmission(){
        this.get_products();
        //handleSuccessfullNewSubmission(newEmployee){
        console.log("Estamos en inventory");
        this.setState({
            productModalIsOpen: false
            //---->blogItems: [blog].concat(this.state.blogItems)  //El blog creado, se le concatena los blogs ya existentes, para visualizar todo, el nuevo primero
        });
        console.log("Despues del setstate");
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
        var getProductsEndpoint = this.state.apiUrl + "master-products"
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
                    productList: [...preparedResponse],
                    allProducts: [...preparedResponse]
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
        var products = this.state.productList;        
        console.log("Products:", products);
        
            const ProductTypes = products.map(productsForType =>{
                if (products.length > 0) {
                    return(
                        <div key={"type" + productsForType[0].b_type_id} className="products-grid-wrapper">
                            <div className="product-type">{productsForType[0].b_type}</div>
                            <ProductsContainer
                            data={productsForType}   
                            handleEditClick={this.handleEditClick}     
                            handleDeleteClick = {this.handleDeleteClick}
                            />
                        </div>
                    );
                }
            });
        return ProductTypes
    }    
    handleDeleteClick(product){
        console.log("Valores:", product.mp_id);
        const answer = window.confirm("Deleting Master Product, are you sure?");
        if (answer) {
          //console.log("Deleting...");
          this.apiDel(product);
        }   
    }
    apiDel(product){
        var employeeEndpoint = this.state.apiUrl + "master-product/" + product.mp_id;
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            });
            axiosInstance
            .delete(employeeEndpoint)
            .then(resp =>{
                console.log("BBDD api response", resp);   
                if(resp.data.status == "ERROR"){
                    this.setState({
                        error_message: resp.data.message
                    })
                  }else{
                        //Wait the response to close       
                        var foundIndex = 0;
                        var updatedProductList = [...this.state.productList];     
                        
                        updatedProductList.forEach((productsByType) => {
                            console.log(productsByType);
                            foundIndex = productsByType.findIndex(x => x.mp_id == product.mp_id); 
                            productsByType.splice(foundIndex, 1);  //deleting de customer from array                           
                        });

                        this.setState({
                            productList: [...updatedProductList]
                        });   
                        this.iterateTypesGroups();    
                      }   
            }).catch(error => {
                    console.log("Error from delete", error);
                    this.setState({
                        error_message: error
                    })                    
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
    handleFind(filterValue){
        
        let finalFilter = [];
        if (filterValue !=""){
            let filteredProducts = [];
            var i = 0;
            this.state.allProducts.forEach((allProductsByType) =>{
                console.log("product by type",allProductsByType);

                let filteredProductList_code = allProductsByType.filter((product) => {
                    return product.code.toLowerCase().match(filterValue.toLowerCase());
                });    
                let filteredProductList_name = allProductsByType.filter((product) => {
                    return product.name.toLowerCase().match(filterValue.toLowerCase());
                });
                let filteredProducList_brand = allProductsByType.filter((product) => {
                    return product.b_name.toLowerCase().match(filterValue.toLowerCase());
                }); 
                filteredProducts = [...new Set([...filteredProductList_code, ...filteredProductList_name])];
                filteredProducts = [...new Set([...filteredProducts, ...filteredProducList_brand])]; 
                
                if(filteredProducts.length > 0){
                    finalFilter[i] = [...filteredProducts];
                    i++;
                }           
            });
        }else{
            finalFilter = [...this.state.allProducts];
        }

         this.setState({
            productList: finalFilter,
            nofilter: false
         })
         
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
                    <div className="gap"></div>
                    <div className="actions">
                        <a className = "action-icon" onClick={this.handleNewProductClick}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></a>
                    </div>
                    <div className="find-wrapper">
                        <input
                        type="text"
                        name="filter"
                        placeholder="Find Master Product"
                        value={this.state.filter}
                        onChange={this.handleChange}></input>
                    </div>
                </div>
                {this.iterateTypesGroups()}
                
            </div>
        );
    }    
}
