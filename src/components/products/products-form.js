import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

import { API_url, API_port, img_API_id, img_API_url, img_API_default_product_url } from "../constants/global";
import ProductTypes from "./product-types.js";
import ProductBrands from "./product-brands.js";

export default class ProductsForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            product_types:[],
            product_brands:[],
            id: 0,
            code: "",
            name: "",           
            description: "",
            b_id: 20,
            b_name: "BH",
            b_type: "Bikes",
            b_type_id: 2,
            product_img_url:"",
            product_img_url_prev:"",                        
            price: "",
            size: "",
            error_message:"",
            editMode: false,
            button: "save"            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleImgDrop = this.handleImgDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.imgCheck = this.imgCheck.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.apiPost = this.apiPost.bind(this);
        this.apiPut = this.apiPut.bind(this);
        //this.apiDel = this.apiDel.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.imgRef = React.createRef();

        
    }
    deleteImage(){
        this.setState({
            product_img_url:""
        })
    }

    handleImgDrop(){
        //Si pasarias en una variable el tipo de imagen(en lugar de tres funciones) daria error
        return{
            addedfile: file => this.setState({
                product_img: file
            })
        };
    }
    componentConfig(){
        return{
            //appears in documentation
            iconFiletypes:[".jpg",".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"     //TRAMPA Una url que siempre devuelve true y que hace que salga check cuando la imagen se ha subido
        }
    }
    djsConfig(){
        return{
            addRemoveLinks: true,
            masFiles:1
        }
    }


    buildForm(product_img_url){
        var object = {};
        let formData = new FormData();
        formData.append("code", this.state.code);
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("b_id", this.state.b_id);
        formData.append("b_name", this.state.b_name);
        formData.append("b_type", this.state.b_type);
        formData.append("b_type_id", this.state.b_type_id);
        

        if(this.state.product_img_url){
            formData.append("img_url", this.state.product_img_url);   
        }else{
            formData.append("img_url", product_img_url);  //parse
        }       

        if(this.state.price){
            formData.append("price", this.state.price); 
        }else{           
            formData.append("price", "0"); 
        }  

        //convert to json
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);     
        return json;
    }

    //Create product
    apiPost(product_img_url){
        //App API
        const formData = this.buildForm(product_img_url);
        //console.log("sending data:",formData);
        var productEndpoint = this.state.apiUrl + "master-product";
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
                    console.log("image error", error);
                    this.setState({
                        error_message: error
                    })                    
            });
            
    }
    //Update product
    apiPut(product_img_url){
         //App API
         const formData = this.buildForm(product_img_url);
         //console.log("sending data EDIT:",formData);
         var productEndpoint = this.state.apiUrl + "master-product/" + this.state.mp_id;
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
    //Delete employee
    /*
    apiDel(){
          //App API
          var employeeEndpoint = this.state.apiUrl + "master-product/" + this.state.mp_id
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
                        this.modalClose();
                        }   
              }).catch(error => {
                      console.log("Error from delete", error);
                      this.setState({
                          error_message: error
                      })                    
              });         
    }
    */
    //Close modal
    modalClose(){
        if (this.state.error_message ===""){
            //no errors. close.
            this.props.handleSuccessfullFormSubmission()
        }
    }
    handleSubmit(event){
        //check all the fields.
        var fieldsCorrect = this.checkFields(); //Check fields and new password
        //console.log("Edit mode:", this.state.editMode);
        if(this.state.button === "save"){
            //console.log("Saving...");
            if(fieldsCorrect === true){
                var image_url = "";   
                if(this.state.product_img || 
                    (this.state.product_img && this.state.editMode === true && this.state.product_img_url_prev != this.state.product_img_url)){
                    //console.log("image", this.state.product_img)
                    //Image API
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
                        //console.log("image response", response);
                        //Set state is not working here:
                        this.setState = ({
                            product_img_url: response.data.data.url
                        });     
                        image_url = response.data.data.url;
                        if(this.state.editMode === false){
                            this.apiPost(image_url);
                        }else{
                            this.apiPut(image_url);
                        }           
                    }).catch(error => {
                            //console.log("image error", error);
                            this.setState({
                                error_message: error
                            })
                    });
                }else{
                    //Default img in image API, No Img API
                    if(!this.state.product_img_url){
                        this.setState({
                            product_img_url : img_API_default_product_url
                        })
                        image_url = img_API_default_product_url;
                    }
    
                    if(this.state.editMode === false){
                        console.log("New product");
                        this.apiPost(image_url); 
                    }else{
                        console.log("Updating product");
                        this.apiPut(image_url); 
                    }
    
                       
                } 

            }else{
                this.setState({
                    error_message : "Please, complete all the fields correctly"
                })
            }            
        }else{
            
            const answer = window.confirm("Deleting master product, are you sure?");
            if (answer) {
              //console.log("Deleting...");
              //this.apiDel();
            }
        }
        event.preventDefault();
    }
    checkFields(){
        var fieldsCorrect = true
        if(this.state.code.length < 1 || this.state.name.length < 1){
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

    getProductTypes(){
        //axios get
        var getProductsEndpoint = this.state.apiUrl + "brand-types";
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
                    product_types: [...response.data]
                })
                console.log("Product types:", this.state.product_types);
            }).catch(error => {
                console.log("Some error occurred", error);
                this.setState(
                    {
                        errorText: 'Error ocurred:' + error
                    }
                )
                //TODO CHECK WHY?
                this.props.hadleUnsuccessfulAuth();
            });  
    }
    getBrands(){
         //axios get
         var getProductsEndpoint = this.state.apiUrl + "brands";
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
                    product_brands: [...response.data]
                 })
                 console.log("Product types:", this.state.product_types);
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
    componentDidMount(){
        this.getProductTypes();
        this.getBrands();
    }

    componentDidUpdate() {
        //comprueba si hay para editar, si lo hay almacena los valores en un const
        //console.log("Employees", this.props.productToEdit);
        console.log("Product to edit:", this.props.productToEdit);
        if (Object.keys(this.props.productToEdit).length > 0) {
          const {
            b_id,
            b_name,
            b_type,
            b_type_id,
            code,
            img_url,
            mp_id,
            name,
            price,
            description,
            id,
            size
          } = this.props.productToEdit;

          this.props.clearProductToEdit();    //Limpia los valores que se muestran en form.
          console.log("b_id de props", this.props.productToEdit.b_id);         
          console.log("b_id:", b_id); 
          this.setState({   //Completa la pantalla form con los datos.
            b_id: b_id,
            b_name: b_name,
            b_type: b_type,
            b_type_id: b_type_id,
            code: code,
            product_img_url: img_url,
            product_img_url_prev: img_url,
            mp_id: mp_id,
            name: name,
            price: price,
            description: description,
            id: id,
            size: size,
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
    const productTypes = this.state.product_types.map(productType =>{ //map returns an array
        return <ProductTypes key={productType.id} productTypes={productType}/>;
    }); 
    
    const productBrands = this.state.product_brands.map(productBrand =>{ //map returns an array
        return <ProductBrands key={productBrand.id} productBrands={productBrand}/>;
    });     
    return(        
        <form onSubmit={this.handleSubmit} className="product-form-wrapper">    
        <div className="left-column">
            <div className="image-uploaders">
                {this.state.product_img_url && this.state.editMode ? 
                    (<div className="product-manager-image-wrapper">
                        <img src={this.state.product_img_url}/>
                        <div className="image-removal-link">
                            <a onClick={()=> this.deleteImage()}>
                                Remove file
                            </a>
                        </div>
                    </div>)
                    :
                    (<DropzoneComponent
                    ref={this.imgRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleImgDrop()}
                    >
                        <div className="dz-message">mp Image</div>  {/* Child component por defecto de la class dropzonecomponent */}
                    </DropzoneComponent>)
                }
            </div>
        </div>   
        <div className="rigth-column">
            <div className="two-column">
                <input
                type="text"
                name="code"
                placeholder="mp Code"
                value={this.state.code}
                onChange={this.handleChange}
                />
                <input
                type="text"
                name="name"
                placeholder="mp Name"
                value={this.state.name}
                onChange={this.handleChange}
                />                      
            </div>
            <div className="two-column">
                <select
                name="b_id"  //identico al state
                value={this.state.b_id}
                onChange={this.handleChange}
                className="select-element"
                >
                    {productBrands}
                </select>  
                <select
                name="b_type_id"  //identico al state
                value={this.state.b_type_id}
                onChange={this.handleChange}
                className="select-element"
                >
                    {productTypes}
                </select>                        
            </div>   
            <div className="two-column">
                <input
                type="text"
                name="price"
                placeholder="mp Price €"
                value={this.state.price}
                onChange={this.handleChange}
                />
            </div>             
            <div className="one-column">
                <div className="error-message-wrapper">
                    {this.state.error_message}
                </div>
                <button className="btn" onClick={() => (this.setState({button: "save"}))} type="submit">Save</button>
                {this.state.own_user === false && this.state.editMode === true ?
                    <button className="btn-del" onClick={() => (this.setState({button: "delete"}))}type="submit">Delete Employee</button>
                : null
                }
                
            </div>             
        </div>                    
        </form>
)

  }
}