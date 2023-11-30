import React, {Component} from "react";
import ReactModal from 'react-modal';
import CustomersForm from "../customers/customers-form";
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
    }
    
    handleSuccessfullFormSubmission(newCustomer){

        this.props.handleSuccessfullNewSubmission(newCustomer);
    }

    
    render(){
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
                customerToEdit = {this.props.customerToEdit}
                clearCustomerToEdit = {this.props.clearCustomerToEdit}
                />             
            </ReactModal>
            
        );
    }
}