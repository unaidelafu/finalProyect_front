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
            
        }
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
    //Create employee
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
                    this.modalClose();
                 }              

            }).catch(error => {
                    //console.log("image error", error);
                    this.setState({
                        error_message: resp.data.message
                    })                    
            });
            
    }
    //Update employee
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
                    this.modalClose();
                 }            
             }).catch(error => {
                     console.log("image error", error);
                     this.setState({
                         error_message: resp.data.message
                     })                    
             });       
    }
    //Delete employee
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
                        this.modalClose();
                        }   
              }).catch(error => {
                      console.log("image error", error);
                      this.setState({
                          error_message: resp.data.message
                      })                    
              });         
    }
    //Close modal
    modalClose(){
        if (this.state.error_message ===""){
            //no errors. close.
            this.props.handleSuccessfullFormSubmission(this.state.name_1 + " " + this.state.name_2)
        }
    }
    handleSubmit(event){
        //check all the fields.
        var fieldsCorrect = this.checkFields(); //Check fields and new password
        //console.log("Edit mode:", this.state.editMode);
        if(this.state.button === "save"){
            //console.log("Saving...");
            if(fieldsCorrect === true){   
                if(this.state.editMode === false){
                    console.log("New employee");
                    this.apiPost(); 
                }else{
                    console.log("Updating employee");
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
    }

    componentDidUpdate() {
        //comprueba si hay para editar, si lo hay almacena los valores en un const
        //console.log("Employees", this.props.employeeToEdit);       
        if (Object.keys(this.props.employeeToEdit).length > 0) {
          const {
            city,
            id,
            mail,
            name_1,
            name_2,
            phone_num,
            sid,
            status
          } = this.props.employeeToEdit;

          this.props.clearCustomerToEdit();    //Limpia los valores que se muestran en form.
          this.setState({   //Completa la pantalla form con los datos.
            city: city,
            id: id,
            mail: mail,
            name: name_1,
            surname: name_2,
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
                <div className="two-column">
                    <input
                    type="text"
                    name="name"
                    placeholder="Customer Name"
                    value={this.state.name_1}
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="surname"  //identico al state
                    placeholder="Customer Name 2"
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
                    <button className="btn-del" onClick={() => (this.setState({button: "delete"}))}type="submit">Delete Employee</button>                   
                </div>             
            </div>                    
        </form>
)

  }
}