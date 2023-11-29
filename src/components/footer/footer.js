import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, withRouter } from "react-router-dom"; //si empieza en minuscula HOC high order component


const Footer =  (props) =>{
    return(<div className="footer-wrapper">Unai De La Fuente - 2023 Devcamp Final Proyect</div>);
}
export default withRouter(Footer);
