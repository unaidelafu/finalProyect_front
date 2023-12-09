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
                        var updatedProductList = [];     
                        console.log("state products:", this.state.productList);
                        var oldProductFirstList = [...this.state.productList[0]];
                        var oldProductSecondList = [...this.state.productList[1]];

                        console.log("old products1:", oldProductFirstList);    
                        console.log("old products2:", oldProductSecondList);    
                        foundIndex = oldProductFirstList.findIndex(x => x.mp_id == product.mp_id); 
                        oldProductFirstList.splice(foundIndex, 1);  //deleting de customer from array

                        if(foundIndex < 1){
                            foundIndex = oldProductSecondList.findIndex(x => x.mp_id == product.mp_id);
                            oldProductSecondList.splice(foundIndex, 1);  //deleting de customer from array
                        }

                        updatedProductList[0] = [...oldProductFirstList];
                        updatedProductList[1] = [...oldProductSecondList];
                        
                        console.log("Deleted array: ", updatedProductList);
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
        
        console.log("Finding:", filterValue);

        console.log("All master products", this.state.allProducts, this.state.nofilter);
        let finalFilter = [];
        //TODO: CONVERT TO ITERABLE ARRAY
        if (filterValue !=""){
            let allProductsFirstList = [...this.state.allProducts[0]];
            let allProductsSecondList = [...this.state.allProducts[1]];
            let filteredProductsFirst = [];
            let filteredProductsSecond = [];
            //First list find:
            //code, name, b_name
            let filteredProductFirstList_code = allProductsFirstList.filter((product) => {
                return product.code.toLowerCase().match(filterValue.toLowerCase());
            });    
            let filteredProductFirstList_name = allProductsFirstList.filter((product) => {
                return product.name.toLowerCase().match(filterValue.toLowerCase());
            });
            let filteredProductFirstList_brand = allProductsFirstList.filter((product) => {
                return product.b_name.toLowerCase().match(filterValue.toLowerCase());
            });   
             console.log("Filtered name:", filteredProductFirstList_name);
             console.log("Filtered brande:", filteredProductFirstList_brand);
             console.log("Filtered code", filteredProductFirstList_code);
    
             filteredProductsFirst = [...new Set([...filteredProductFirstList_code, ...filteredProductFirstList_name])];
             filteredProductsFirst = [...new Set([...filteredProductsFirst, ...filteredProductFirstList_brand])];
    
            //Second list find:
            //code, name, b_name
            let filteredProductSecondList_code = allProductsSecondList.filter((product) => {
                return product.code.toLowerCase().match(filterValue.toLowerCase());
            });    
            let filteredProductSecondList_name = allProductsSecondList.filter((product) => {
                return product.name.toLowerCase().match(filterValue.toLowerCase());
            });
            let filteredProductSecondList_brand = allProductsSecondList.filter((product) => {
                return product.b_name.toLowerCase().match(filterValue.toLowerCase());
            });   
             console.log("Filtered name:", filteredProductSecondList_name);
             console.log("Filtered brand:", filteredProductSecondList_brand);
             console.log("Filtered code", filteredProductSecondList_code);
    
             filteredProductsSecond = [...new Set([...filteredProductSecondList_code, ...filteredProductSecondList_name])];
             filteredProductsSecond = [...new Set([...filteredProductsSecond, ...filteredProductSecondList_brand])];
    
             //filteredCustomers.sort();
            var i = 0;
            if(filteredProductsFirst.length > 0){
                finalFilter[i] = [...filteredProductsFirst];
                i++;
            }
            if(filteredProductsSecond.length > 0){
                finalFilter[i] = [...filteredProductsSecond];
            }
        }else{
            finalFilter = [...this.state.allProducts];
        }



         console.log("Filtered final", finalFilter);

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
