import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, withRouter } from "react-router-dom"; //si empieza en minuscula HOC high order component
import EmployeeModal from "../modals/employee-modal.js";

//convert to functional component:
const NavigationContainer =  (props) =>{
    const dynamicLink = (route, linkText) =>{
        return(    
        <div className="nav-link-wrapper">
        <NavLink to ={route} activeClassName="nav-link-active">
            {linkText}
        </NavLink>
        </div>
        );
    };

    const handleSignOut = () =>{
        props.history.push("/auth");
        props.handleSuccessfulLogout();
    };
    const handleEditClick = () =>{
        console.log("Clicked")
        props.handleOwnUserEdit();
    }

    return(
        <div className="nav-wrapper">
            <div className="left-side">
            {/*Con navLink, navega pero no recarga toda la pagina.
            Con <a href="/" recarga toda la pagina*/}
            {/*Al pulsar cada ruta, utiliza la class = active
            puede editarse y nombrar esa clase de activo: "unai-active"
            Interesante para cambiar los estilos del titulo.*/}
                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/work", "Work") : null}
                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/inventory", "Inventory") : null}
                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/customers", "Customers") : null}
                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/bikes", "Bikes") : null}  
                    {props.loggedInStatus === "LOGGED_IN" && props.adminUser === "1"? 
                    dynamicLink("/employees", "Employees") : null}
        
            {/*false ? <button>Add Blog</button>: null conditional if*/}
            </div>
            <div className="right-side">
                
                {props.loggedInStatus === 'LOGGED_IN' ? (
                    <div className="logged-user">
                        {/*<EmployeeModal
                            handleModalClose={handleModalClose}            
                            modalIsOpen = {this.state.employeeModalIsOpen} 
                            employeeToEdit = {this.state.employeeToEdit}
                clearEmployeeToEdit = {clearEmployeeToEdit}/>*/}
                        <a onClick={handleEditClick}>{props.userName}</a>
                        <a onClick={handleSignOut}>
                            <FontAwesomeIcon icon="sign-out-alt"/>
                        </a>
                    </div>
                ) : null}
            </div>  
        </div>
    )
}
export default withRouter(NavigationContainer);