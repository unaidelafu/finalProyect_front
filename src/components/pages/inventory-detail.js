import React, {Component} from "react";
import axios from "axios";

import { API_url, API_port } from "../constants/global";

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
    }
    getProductItem(){

        //axios get
        var getProductsEndpoint = this.state.apiUrl + "product/" + this.state.currentId
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
            <div className="product-container"> 
                <div className="content-container">
                    <h1> {this.state.productList.code} </h1>
                    <div className="content">
                        {this.state.productList.description}
                     </div>
                </div>
            </div>
        )
    }
}