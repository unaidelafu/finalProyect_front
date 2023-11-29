import React, {Component} from "react";
import ReactModal from 'react-modal';
import EmployeesForm from "../employees/employees-form";
//import Home from "../pages/home";
ReactModal.setAppElement(".app-wrapper"); //buscando class, # buscando id   Para que no casque un error de modal
                                            //Es la class que obtiene toda la aplicación, la que se encuentra en el index.

export default class EmployeeModal extends Component{
    constructor(props) {
        super(props);
        /*
        this.state({
            admin: 0,
            id: 0,
            img_url: "",
            job: "",
            job_id: 0,
            mail: "",
            name_1: "",
            name_2: "",
            phone_num: "",
            pswrd: "",
            sid: "",
            prevJob: ""        
        })*/
        //Modal Style
        this.customStyles = {
            content:{
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width:"90%",
                height:"70%"
                
                //width:"800px"
            },
            overlay:{
                backgroundColor: "rgba(1,1,1,0.7)"
            }
            
        };

        this.handleSuccessfullFormSubmission = this.handleSuccessfullFormSubmission.bind(this);
    }
    
    handleSuccessfullFormSubmission(newEmployee){

        this.props.handleSuccessfullNewSubmission(newEmployee);
    }
/*
    componentDidUpdate() {
        //comprueba si hay para editar, si lo hay almacena los valores en un const
        console.log("employee props",Object.keys(this.props.employeeToEdit));

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

          this.props.clearEmployeeToEdit();    //Limpia los valores que se muestran en portfolio.

          this.setState({   //Completa la pantalla portfolio con los datos.
            admin: admin,
            id: id,
            img_url: img_url,
            job: job,
            job_id: job_id,
            mail: mail,
            name: name_1,
            name_2: name_2,
            phone_num: phone_num,
            pswrd: pswrd,
            sid: sid,
            status: status,
            editMode: true,
          })
          
        }
      }
      */





    
    render(){
        //console.log("Employeessss", this.props.employeeToEdit);
        return(
            //<h1>Hi modal</h1>          
            <ReactModal
            style={this.customStyles}
            onRequestClose={()=>{
                this.props.handleModalClose();
            }} isOpen={this.props.modalIsOpen}
            >
                <EmployeesForm 
                handleSuccessfullFormSubmission = {this.handleSuccessfullFormSubmission}
                employeeToEdit = {this.props.employeeToEdit}
                clearEmployeeToEdit = {this.props.clearEmployeeToEdit}
                ownUser = {this.props.ownUser}/>             
            </ReactModal>
            
        );
    }
}
//<EmployeesForm/>