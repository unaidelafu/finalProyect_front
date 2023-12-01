import React, { Component } from "react";
import axios from "axios";

import { API_url, API_port} from "../constants/global";


export default class CustomersForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            name_1: "",
            name_2:"",
            sid: "",
            city:"",
            mail: "",
            phone_number:"",
            status:"ACTIVE",
            error_message:"",
            editMode: false,
            button: "save"           
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.checkFields = this.checkFields.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.apiPost = this.apiPost.bind(this);
        this.apiPut = this.apiPut.bind(this);
        this.apiDel = this.apiDel.bind(this);
        this.modalClose = this.modalClose.bind(this);

        
    }



    buildForm(){
        var object = {};
        let formData = new FormData();
        
        formData.append("sid", this.state.sid);
        formData.append("name_1", this.state.name_1);
        formData.append("name_2", this.state.name_2);
        formData.append("mail", this.state.mail);
        formData.append("phone_num", this.state.phone_number);
        formData.append("city", this.state.city);
        formData.append("status", this.state.status);                 
        
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);     
        return json;
    }
    //Create customer
    apiPost(){
        //App API
        const formData = this.buildForm();
        //console.log("sending data:",formData);
        var customerEndpoint = this.state.apiUrl + "customer";
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            });
            axiosInstance
            .post(customerEndpoint,formData)
            .then(resp =>{
                //console.log("BBDD api response", resp);   
                if(resp.data.status == "ERROR"){
                    this.setState({
                        error_message: resp.data.message
                    })
                }else{
                    //Wait the response to close          
                    this.modalClose("post",resp.data.message[0]);  //We have the customer info in the response
                 }              

            }).catch(error => {
                    //console.log("image error", error);
                    this.setState({
                        error_message: resp.data.message
                    })                    
            });
            
    }
    //Update customer
    apiPut(){
         //App API
         const formData = this.buildForm();
         //console.log("sending data EDIT:",formData);
         var customerEndpoint = this.state.apiUrl + "customer/" + this.state.id;
         const axiosInstance = axios.create({
             headers: {
                 "Content-Type": "application/json",
                 "Access-Control-Allow-Origin": "*"
             }
             });
             axiosInstance
             .put(customerEndpoint,formData)
             .then(resp =>{
                 console.log("BBDD api response", resp);   
                 if(resp.data.status == "ERROR"){
                     this.setState({
                         error_message: resp.data.message
                     })
                 }else{
                    //Wait the response to close 
                    console.log("La respuesta:", resp.data);           
                    this.modalClose("put", resp.data.message[0]);
                 }            
             }).catch(error => {
                     console.log("image error", error);
                     this.setState({
                         error_message: resp.data.message
                     })                    
             });       
    }
    //Delete customer
    apiDel(){
          //App API
          var customerEndpoint = this.state.apiUrl + "customer/" + this.state.id
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
    modalClose(action, customer){
        
        if (this.state.error_message ===""){
            //no errors. close.
            if (this.state.editMode === false){
                this.props.handleSuccessfullFormSubmission(customer);
            }else if(action === "put"){
                this.props.handleSuccessfullEditFormSubmission(customer);
            }else{
                this.props.handleSuccessfullDeleteFormSubmission(customer); //customer id is sended
            }           
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
                    console.log("New Customer");
                    this.apiPost(); 
                }else{
                    console.log("Updating Customer");
                    this.apiPut(); 
                }
            }else{
                this.setState({
                    error_message : "Please, complete all the fields correctly"
                })
            }            
        }else{           
            const answer = window.confirm("Deleting Customer, are you sure?");
            if (answer) {
              //console.log("Deleting...");
              this.apiDel();
            }
        }
        
        event.preventDefault();
    }
    checkFields(){
        var fieldsCorrect = true
        if(this.state.sid.length < 1 || this.state.name_1.length < 1 || this.state.name_2.length < 1){
            fieldsCorrect = false;
        }
        return fieldsCorrect
    }
 
    componentDidMount(){
        //this.getJobTypes();
        //setting state componentDidUpdate will run
        this.setState({
            name_1: ""
        })
    }

    componentDidUpdate() {
        //comprueba si hay para editar, si lo hay almacena los valores en un const
        console.log("Form Customers to edit", this.props.customerToEdit);       
        if (Object.keys(this.props.customerToEdit).length > 0) {
          const {
            city,
            id,
            mail,
            name_1,
            name_2,
            phone_num,
            sid,
            status
          } = this.props.customerToEdit;

          this.props.clearCustomerToEdit();    //Limpia los valores que se muestran en form.
          this.setState({   //Completa la pantalla form con los datos.
            city: city,
            id: id,
            mail: mail,
            name_1: name_1,
            name_2: name_2,
            phone_number: phone_num,
            sid: sid,
            status: status,
            editMode: true
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
    return(
        <form onSubmit={this.handleSubmit} className="customer-form-wrapper">    
            <div className="main-column">
            <div className="one-column">
                <div className="title">Customer Form</div>
            </div>
                <div className="two-column">
                    <input
                    type="text"
                    name="name_1"
                    placeholder="Customer Name"
                    value={this.state.name_1}
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="name_2"  //identico al state
                    placeholder="Customer second Name"
                    value={this.state.name_2}
                    onChange={this.handleChange}
                    />                        
                </div>
                <div className="two-column">
                    <input
                    type="text"
                    name="sid"
                    placeholder="Identity Doc Num"
                    value={this.state.sid}
                    onChange={this.handleChange}
                    />      
                    <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={this.state.city}
                    onChange={this.handleChange}
                    />                                
                </div>   
                <div className="two-column">
                    <input
                    type="text"
                    name="mail"
                    placeholder="e-mail"
                    value={this.state.mail}
                    onChange={this.handleChange}
                    />
                    <input
                    type="tel"
                    name="phone_number"  //identico al state
                    placeholder="Phone Number"
                    value={this.state.phone_number}
                    onChange={this.handleChange}
                    />                        
                </div>                 
                <div className="one-column">
                    <div className="error-message-wrapper">
                        {this.state.error_message}
                    </div>
                    <button className="btn" onClick={() => (this.setState({button: "save"}))} type="submit">Save</button>
                    {this.state.editMode === true ?
                        <button className="btn-del" onClick={() => (this.setState({button: "delete"}))}type="submit">Delete Customer</button>
                    : null
                    }                  
                </div>             
            </div>                    
        </form>
)

  }
}