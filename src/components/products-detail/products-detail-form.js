import React, { Component } from "react";
import axios from "axios";

import { API_url, API_port, img_API_id, img_API_url, img_API_default_product_url } from "../constants/global";
import ProductWharehouses from "./product-detail-wharehouses.js";
import ProductSizes from "./porduct-detail-size.js";


export default class ProductsDetailForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            product_wharehouses:[],
            product_sizes:[],
            mp_id: this.props.mp_id,
            id: 0,      
            description: "",                   
            w_id: 1,
            size: "NO SIZE",
            qty: 0,
            error_message:"",
            editMode: false,
            button: "save"            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.imgCheck = this.imgCheck.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.buildFormStockLine = this.buildFormStockLine.bind(this);
        this.apiPost = this.apiPost.bind(this);
        this.apiPut = this.apiPut.bind(this);
        this.apiDelProduct = this.apiDelProduct.bind(this);
        this.apiDelStockLine = this.apiDelStockLine.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.imgRef = React.createRef();

        
    }




    buildForm(){
        var object = {};
        let formData = new FormData();
        formData.append("mp_id", this.state.mp_id);
        formData.append("description", this.state.description);
        formData.append("size", this.state.size);
        formData.append("wharehouse_id", this.state.w_id);
        formData.append("qty", this.state.qty);       
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);   
        console.log("json:", json);    
        return json;
    }
    buildFormStockLine(){
        var object = {};
        let formData = new FormData();
        formData.append("wharehouse_id", this.state.w_id);  
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        console.log("json:", json);     
        return json;
    }
    //Create product
    apiPost(){
        //App API
        const formData = this.buildForm();
        console.log("sending data:",formData);
        
        var productEndpoint = this.state.apiUrl + "product";
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            });
            axiosInstance
            .post(productEndpoint,formData)
            .then(resp =>{
                console.log("BBDD api response", resp.data.status);   
                if(resp.data.status == "ERROR"){
                    console.log("error");   
                    this.setState({
                        error_message: resp.data.message
                    })
                }else{  
                    //Wait the response to close            
                    this.modalClose();
                 }              

            }).catch(error => {
                    console.log("error", error);
                    this.setState({
                        error_message: error
                    })                    
            });
        
            
    }
    //Update product
    apiPut(product_img_url){
         //App API
         const formData = this.buildForm();
         //console.log("sending data EDIT:",formData);
         var productEndpoint = this.state.apiUrl + "product/" + this.state.id;
         const axiosInstance = axios.create({
             headers: {
                 "Content-Type": "application/json",
                 "Access-Control-Allow-Origin": "*"
             }
             });
             axiosInstance
             .put(productEndpoint,formData)
             .then(respi =>{
                 console.log("BBDD api response", respi);   
                 if(respi.data.status == "ERROR"){
                     this.setState({
                         error_message: respi.data.message
                     })
                 }else{
                    //Wait the response to close            
                    this.modalClose();
                 }            
             }).catch(error => {
                     console.log("image error", error);
                     this.setState({
                         error_message: error
                     })                    
             });       
    }
    //Delete product line
    apiDelProduct(){
          //App API
          var customerEndpoint = this.state.apiUrl + "product/" + this.state.id
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
                          error_message: resp.data.message
                      })
                    }else{
                        //Wait the response to close            
                        this.modalClose("del",this.state.id);
                        }   
              })
              .catch(error => {
                console.log("Error from delete", error);
                this.setState({
                    error_message: error
                });                   
              });         
    }
    //Delete stock line
    apiDelStockLine(){
           //App API
           //Params is not working, so we send id and wharehose id in the endpoint
           var customerEndpoint = this.state.apiUrl + "stock/" + this.state.id + "/" + this.state.w_id
           console.log("api url", customerEndpoint)
           //const formData = this.buildFormStockLine();
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
                           error_message: resp.data.message
                       })
                     }else{
                         //Wait the response to close            
                         this.modalClose("del",this.state.id);
                         }   
               })
               .catch(error => {
                 console.log("Error from delete", error);
                 this.setState({
                     error_message: error
                 });                   
               });           
    }
    //Close modal
    modalClose(){
        if (this.state.error_message ===""){
            //no errors. close.
            this.props.handleSuccessfullFormSubmission()
        }
    }
    handleSubmit(event){
        console.log("handlesubmit");
        //check all the fields.
        var fieldsCorrect = this.checkFields(); //Check fields and new password
        //console.log("Edit mode:", this.state.editMode);
        if(this.state.button === "save"){
            //console.log("Saving...");
            if(fieldsCorrect === true){   
                if(this.state.editMode === false){
                    console.log("New product");
                    this.apiPost(); 
                }else{
                    console.log("Updating product");
                    this.apiPut(); 
                }
            }else{
                this.setState({
                    error_message : "Please, complete all the fields correctly"
                })
            }            
        }else if(this.state.button === "delete-product"){           
            const answer = window.confirm("Deleting product variant in ALL Wharehouses, are you sure?");
            if (answer) {
              //console.log("Deleting...");
              this.apiDelProduct();
            }
        }else{
            const answer = window.confirm("Deleting product stock line, are you sure?");
            if (answer) {
              //console.log("Deleting...");
              this.apiDelStockLine();
            }           
        }
        
        event.preventDefault();
    }
    checkFields(){
        var fieldsCorrect = true
        if(this.state.description.length < 1 || this.state.qty.length < 1 ){
            fieldsCorrect = false;
        }
        return fieldsCorrect
    }
 
    imgCheck(){
        // Post the image to the Image API (imgbb.com)

        if(this.state.product_img){
            //console.log("image", this.state.product_img)
            var file = this.state.product_img;
            var form = new FormData();
            form.append("image", file)
            axios({
                method: "POST",
                url: img_API_url,
                timeout: 0,
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                data: form
        
            }).then(response =>{
                console.log("image response", response);
                //Get the generated url for de BBDD
                this.setState = ({
                    product_img_url: response.data.url
                });
            }).catch(error => {
                    console.log("image error", error);
                    this.setState({
                        error_message: "Image error: " + error
                    })
            });

        }     
    }

    getProductWharehouses(){
         //axios get
         var getProductsEndpoint = this.state.apiUrl + "wharehouses";
         const axiosInstance = axios.create({
             headers: {
                 "Content-Type": "application/json"
             }
             });
             axiosInstance
             .get(getProductsEndpoint)
             .then(response => {
                 //Add the job of the previus person to Print the job on the header of emplyees-container      
                 this.setState({
                     product_wharehouses: [...response.data]
                 })
                 console.log("Product wharehouses:", this.state.product_wharehouses);
             }).catch(error => {
                 console.log("Some error occurred", error)
                 this.setState(
                     {
                         errorText: 'Error ocurred:' + error
                     }
                 )
                 //TODO CHECK WHY?
                 this.props.hadleUnsuccessfulAuth();
             });         
    }
    getProductSizes(){
        //var i = 0;
        
        let productSizeItem = {};
        let productSizeList = [];
        let sizes = ["NO SIZE","XS","S","M","L","XL"];
        let sizeLength = sizes.length;

        for(var i = 0; i < sizeLength; i++){
            productSizeItem = {id: i, name: sizes[i]};
            productSizeList.push(productSizeItem);
        }
        this.setState(
            {
                product_sizes: productSizeList
            });
    }
    componentDidMount(){
        this.getProductWharehouses();
        this.getProductSizes();
    }

    componentDidUpdate() {
        //comprueba si hay para editar, si lo hay almacena los valores en un const
        //console.log("Employees", this.props.productToEdit);
        console.log("Product to edit:", this.props.productToEdit);
        if (Object.keys(this.props.productToEdit).length > 0) {
          const {
            mp_id,
            description,
            id,
            w_id,
            size,
            qty
          } = this.props.productToEdit;

          this.props.clearProductToEdit();    //Limpia los valores que se muestran en form.
          this.setState({   //Completa la pantalla form con los datos.
            mp_id: mp_id,
            description: description,
            id: id,
            size: size,
            w_id: w_id,
            qty: qty,
            editMode: true
            //---
          })
        }
        
      }


    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            error_message: ""
        })
    }

  render() {
    const productWharehouses = this.state.product_wharehouses.map(productWharehouse =>{ //map returns an array
        return <ProductWharehouses key={productWharehouse.id} productWharehouses={productWharehouse}/>;
    }); 
    console.log("Product sizes: ", this.state.product_sizes);
    const productSizes= this.state.product_sizes.map(productSize =>{ //map returns an array
        return <ProductSizes key={productSize.id} productSizes={productSize}/>;
    });     
    
 
    return(        
        <form onSubmit={this.handleSubmit} className="product-detail-form-wrapper">      
            <div className="main-column">
                <div className="one-column">
                    <div className="title">Product Form</div>
                </div>
                <div className="two-column">
                    <select
                    name="w_id"  //identico al state
                    value={this.state.w_id}
                    onChange={this.handleChange}
                    className="select-element"
                    >
                        {productWharehouses}
                    </select>                
                    <input
                    type="text"
                    name="description"
                    placeholder="prod. Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    />                 
                </div>
                <div className="two-column">
                    <select
                    name="size"  //identico al state
                    value={this.state.size}
                    onChange={this.handleChange}
                    className="select-element"
                    >
                        {productSizes}
                    </select>  
                    <input
                    type="text"
                    name="qty"
                    placeholder="prod. qty"
                    value={this.state.qty}
                    onChange={this.handleChange}
                    />                     
                </div>              
                <div className="one-column">
                    <div className="error-message-wrapper">
                        {this.state.error_message}
                    </div>
                    <button className="btn" onClick={() => (this.setState({button: "save"}))} type="submit">Save</button>
                    {this.state.editMode === true ?
                        <button className="btn-del" onClick={() => (this.setState({button: "delete-stock"}))}type="submit">Delete Stock line</button>
                    : null
                    }
                    {this.state.editMode === true ?
                        <button className="btn-del" onClick={() => (this.setState({button: "delete-product"}))}type="submit">Delete Product</button>
                    : null
                    }               
                </div>             
            </div>                    
        </form>
)

  }
}