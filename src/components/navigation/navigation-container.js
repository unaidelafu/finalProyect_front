import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, withRouter } from "react-router-dom"; //si empieza en minuscula HOC high order component

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
        //Delete de session:
        /*
        axios.delete("https://api.devcamp.space/logout",
        {withCredentials: true}).then(response => {
            if(response.status === 200){    //Success
                props.history.push("/");
                props.handleSuccessfulLogout();
            }
            return response.data;
        })
        .catch(error =>{
            console.log("Error signin out", error)
        });   */
        props.history.push("/auth");
        props.handleSuccessfulLogout();
    };
    

    return(
        <div className="nav-wrapper">
            <div className="left-side">
            {/*Con navLink, navega pero no recarga toda la pagina.
            Con <a href="/" recarga toda la pagina*/}
            {/*Al pulsar cada ruta, utiliza la class = active
            puede editarse y nombrar esa clase de activo: "unai-active"
            Interesante para cambiar los estilos del titulo.*/}
                <div className="nav-link-wrapper">
                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/home", "Home") : null}
                </div>
                <div className="nav-link-wrapper">
                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/inventory", "Inventory") : null}
                </div>
                <div className="nav-link-wrapper">
                    {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/customers", "Customers") : null}  
                </div>
                <div className="nav-link-wrapper">
                    {props.loggedInStatus === "LOGGED_IN" && props.adminUser === "1"? 
                    dynamicLink("/employee-manager", "Employees") : null}
                </div>            
            {/*false ? <button>Add Blog</button>: null conditional if*/}
            </div>
            <div className="right-side">
                
                {props.loggedInStatus === 'LOGGED_IN' ? (
                    <div>
                        <p>{props.userName}</p>
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