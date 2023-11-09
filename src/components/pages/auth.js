import React, { Component } from "react";
import loginImg from "../../../static/assets/images/auth/login.jpg"
import Login from "../auth/login"

export default class Auth extends Component{
    constructor(props){
        super(props);
        this.hadleSuccessfulAuth = this.hadleSuccessfulAuth.bind(this)
        this.hadleUnsuccessfulAuth = this.hadleUnsuccessfulAuth.bind(this)
    }
    hadleSuccessfulAuth(){
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");   //Redirection to the home page
    }
    hadleUnsuccessfulAuth(){
        this.props.handleUnsuccessfulLogin();
    }
    render(){
        return(           
            <div className="auth-page-wrapper">
                <h1>Login class</h1>
                <div className="left-column"              
                style={{
                    backgroundImage:`url(${loginImg})`
                }}>

                </div>
                <div className="right-column">
                    <Login
                        //hadleSuccessfulAuth = {this.hadleSuccessfulAuth}
                        //hadleUnsuccessfulAuth = {this.hadleUnsuccessfulAuth}
                    />
                </div>
            </div>
        )
    }
}