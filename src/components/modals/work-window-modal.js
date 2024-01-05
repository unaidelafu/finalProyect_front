import React, {Component} from "react";
import ReactModal from 'react-modal';
import CustomersForm from "../customers/customers-form";
import IncomingHeaderForm from "../incoming-headers/incoming-headers-form";
import IncomingLinesForm from "../incomin-lines/incoming-lines-form";
ReactModal.setAppElement(".app-wrapper"); //buscando class, # buscando id   Para que no casque un error de modal
                                            //Es la class que obtiene toda la aplicación, la que se encuentra en el index.

export default class CustomerModal extends Component{
    constructor(props) {
        super(props);

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
        this.handleSuccessfullEditFormSubmission = this.handleSuccessfullEditFormSubmission.bind(this);
        this.handleSuccessfullDeleteFormSubmission = this.handleSuccessfullDeleteFormSubmission.bind(this);
        this.checkTheForm = this.checkTheForm.bind(this);
    }
    
    handleSuccessfullFormSubmission(newCustomer){

        this.props.handleSuccessfullNewSubmission(newCustomer);
    }
    handleSuccessfullEditFormSubmission(editedCustomer){

        this.props.handleSuccessfullEditSubmission(editedCustomer);
    }
    handleSuccessfullDeleteFormSubmission(deletedCustomer){

        this.props.handleSuccessfullDelete(deletedCustomer);
    }    
    checkTheForm(){
        if (this.props.Form == "Header"){
            //Return header form
        }else if(this.props.Form == "Lines"){
            //Return Lines form
        }
    }
    
    render(){
        //console.log("editing customer: ", this.props.customerToEdit);
        return(
            //<h1>Hi modal</h1>          
            <ReactModal
            style={this.customStyles}
            onRequestClose={()=>{
                this.props.handleModalClose();
            }} isOpen={this.props.modalIsOpen}
            >
                <CustomersForm 
                handleSuccessfullFormSubmission = {this.handleSuccessfullFormSubmission}
                handleSuccessfullEditFormSubmission = {this.handleSuccessfullEditFormSubmission} 
                handleSuccessfullDeleteFormSubmission = {this.handleSuccessfullDeleteFormSubmission}
                customerToEdit = {this.props.customerToEdit}
                clearCustomerToEdit = {this.props.clearCustomerToEdit}
                />             
            </ReactModal>
            
        );
    }
}