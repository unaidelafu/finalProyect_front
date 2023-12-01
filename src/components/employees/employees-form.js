import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

import { API_url, API_port, img_API_id, img_API_url, img_API_default_employee_url } from "../constants/global";
import EmployeeJobTypes from "./employee-job-types";

export default class EmployeesForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            apiUrl: API_url + ":" + API_port + "/",
            employee_types:[],
            name: "",
            surname:"",
            sid: "",
            job:"1",
            mail: "",
            phone_number:"",
            user_pass:"",
            status:"ACTIVE",
            employee_img_url:"",
            employee_img_url_prev:"",
            new_pass: "",
            new_pass_repeat: "",
            error_message:"",
            editMode: false,
            own_user: true,
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
        this.apiDel = this.apiDel.bind(this);
        this.checkNewPass = this.checkNewPass.bind(this);
        this.modalClose = this.modalClose.bind(this);

        this.imgRef = React.createRef();

        
    }
    checkNewPass(){
        var newpasscorrect = false
        var newPass = this.state.new_pass
        var newPass_repeat = this.state.new_pass_repeat
        if (newPass === newPass_repeat){
            newpasscorrect = true
        }
        return newpasscorrect
    }
    deleteImage(){
        this.setState({
            employee_img_url:""
        })
    }

    handleImgDrop(){
        //Si pasarias en una variable el tipo de imagen(en lugar de tres funciones) daria error
        return{
            addedfile: file => this.setState({
                employee_img: file
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

    buildForm(employee_img_url){
        var object = {};
        let formData = new FormData();
        formData.append("sid", this.state.sid);
        formData.append("name_1", this.state.name);
        formData.append("name_2", this.state.surname);
        formData.append("mail", this.state.mail);
        formData.append("phone_num", this.state.phone_number);
        formData.append("status", this.state.status);
        //TODO: comprobar el state own user y la nueva contraseña
        
        if(this.state.own_user === true && this.state.new_pass){
            formData.append("pswrd", this.state.new_pass); 
        }else{
            if(this.state.user_pass){
                //si no es own user, nunca se actualiza el password
                formData.append("pswrd", ""); 
            }else{
                //New user, default sid is the password
                formData.append("pswrd", this.state.sid); 
            }     
        }
        
             
        formData.append("job", this.state.job);
        //formData.append("img_url", employee_img_url);
        
        if(this.state.employee_img_url){
            formData.append("img_url", this.state.employee_img_url);   
        }else{
            formData.append("img_url", employee_img_url);  //parse
        }   
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);     
        return json;
    }
    //Create employee
    apiPost(employee_img_url){
        //App API
        const formData = this.buildForm(employee_img_url);
        //console.log("sending data:",formData);
        var employeeEndpoint = this.state.apiUrl + "employee";
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            });
            axiosInstance
            .post(employeeEndpoint,formData)
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
    apiPut(employee_img_url){
         //App API
         const formData = this.buildForm(employee_img_url);
         //console.log("sending data EDIT:",formData);
         var employeeEndpoint = this.state.apiUrl + "employee/" + this.state.id;
         const axiosInstance = axios.create({
             headers: {
                 "Content-Type": "application/json",
                 "Access-Control-Allow-Origin": "*"
             }
             });
             axiosInstance
             .put(employeeEndpoint,formData)
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
          var employeeEndpoint = this.state.apiUrl + "employee/" + this.state.id
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
    //Close modal
    modalClose(){
        if (this.state.error_message ===""){
            //no errors. close.
            this.props.handleSuccessfullFormSubmission(this.state.name + " " + this.state.surname)
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
                if(this.state.employee_img || 
                    this.state.employee_img_url_prev != this.state.employee_img_url){
                    //console.log("image", this.state.employee_img)
                    //Image API
                    var file = this.state.employee_img;
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
                            employee_img_url: response.data.data.url
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
                                error_message: resp.data.message
                            })
                    });
                }else{
                    //Default img in image API, No Img API
                    if(!this.state.employee_img_url){
                        this.setState({
                            employee_img_url : img_API_default_employee_url
                        })
                        image_url = img_API_default_employee_url;
                    }
    
                    if(this.state.editMode === false){
                        console.log("New employee");
                        this.apiPost(image_url); 
                    }else{
                        console.log("Updating employee");
                        this.apiPut(image_url); 
                    }
    
                       
                } 

            }else{
                this.setState({
                    error_message : "Please, complete all the fields correctly"
                })
            }            
        }else{
            
            const answer = window.confirm("Deleting Employee, are you sure?");
            if (answer) {
              //console.log("Deleting...");
              this.apiDel();
            }
        }
        event.preventDefault();
    }
    checkFields(){
        var fieldsCorrect = true
        if(this.state.sid.length < 1 || this.state.name.length < 1 || this.state.surname.length < 1){
            fieldsCorrect = false;
        }else{
            if(this.state.own_user === true && this.state.new_pass!==""){
                fieldsCorrect = this.checkNewPass();
            }
        }
        return fieldsCorrect
    }
 
    imgCheck(){
        // Post the image to the Image API (imgbb.com)

        if(this.state.employee_img){
            //console.log("image", this.state.employee_img)
            var file = this.state.employee_img;
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
                    employee_img_url: response.data.url
                });
            }).catch(error => {
                    console.log("image error", error);
                    this.setState({
                        error_message: "Image error: " + error
                    })
            });

        }     
    }

    getJobTypes(){
        //axios get
        var getCustomersEndpoint = this.state.apiUrl + "employee_types"
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getCustomersEndpoint)
            .then(response => {
                //Add the job of the previus person to Print the job on the header of emplyees-container      
                this.setState({
                    employee_types: [...response.data]
                })
                console.log("Employee types:", this.state.employee_types);
            }).catch(error => {
                console.log("Some error occurred", error)
                this.setState(
                    {
                        errorText: 'Error ocurred:' + error
                    }
                )
                this.props.hadleUnsuccessfulAuth();
            });  
    }
    componentDidMount(){
        this.getJobTypes();
    }

    componentDidUpdate() {
        //comprueba si hay para editar, si lo hay almacena los valores en un const
        //console.log("Employees", this.props.employeeToEdit);
        
        if (Object.keys(this.props.employeeToEdit).length > 0) {
          const {
            admin,
            id,
            img_url,
            job,
            job_id,
            mail,
            name_1,
            name_2,
            phone_num,
            pswrd,
            sid,
            status,
            prevJob
          } = this.props.employeeToEdit;

          this.props.clearEmployeeToEdit();    //Limpia los valores que se muestran en form.
          this.setState({   //Completa la pantalla form con los datos.
            admin: admin,
            id: id,
            employee_img_url: img_url,
            employee_img_url_prev: img_url, //saves de previus img to check it changes
            job: job_id,
            job_id: job_id,
            mail: mail,
            name: name_1,
            surname: name_2,
            phone_number: phone_num,
            user_pass: pswrd,
            sid: sid,
            status: status,
            editMode: true,
            new_pass: "",
            new_pass_repeat: "",
            own_user: this.props.ownUser
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
    const jobTypes = this.state.employee_types.map(employeeType =>{ //map returns an array
        return <EmployeeJobTypes key={employeeType.id} employeeJobType={employeeType}/>;
    }); 
    return(        
        <form onSubmit={this.handleSubmit} className="employee-form-wrapper">    
        <div className="left-column">
            <div className="image-uploaders">
                {this.state.employee_img_url && this.state.editMode ? 
                    (<div className="employee-manager-image-wrapper">
                        <img src={this.state.employee_img_url}/>
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
                        <div className="dz-message">Employee Image</div>  {/* Child component por defecto de la class dropzonecomponent */}
                    </DropzoneComponent>)
                }
            </div>
        </div>   
        <div className="rigth-column">
            <div className="two-column">
                <input
                type="text"
                name="name"
                placeholder="Employee Name"
                value={this.state.name}
                onChange={this.handleChange}
                />
                <input
                type="text"
                name="surname"  //identico al state
                placeholder="Employee Surname"
                value={this.state.surname}
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
                <select
                /*{ TODO: /*...this.state.own_user === false ? "disabled" : null }*/
                name="job"  //identico al state
                value={this.state.job}
                onChange={this.handleChange}
                className="select-element"
                >
                    {jobTypes}
                </select>                        
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
            {this.state.own_user === true ?
                <div className="two-column">
                    <input
                    type="text"
                    name="new_pass"
                    placeholder="New Password"
                    value={this.state.new_pass}
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="new_pass_repeat"  //identico al state
                    placeholder="Repeat New Password"
                    value={this.state.new_pass_repeat}
                    onChange={this.handleChange}
                    />                        
                </div> : null }
            
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