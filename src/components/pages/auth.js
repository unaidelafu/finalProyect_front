import React, { Component } from "react";
import loginImg from "../../../static/assets/images/auth/login1.jpg"
import Login from "../auth/login"

export default class Auth extends Component{
    constructor(props){
        super(props);
        this.hadleSuccessfulAuth = this.hadleSuccessfulAuth.bind(this)
        this.hadleUnsuccessfulAuth = this.hadleUnsuccessfulAuth.bind(this)
    }
    hadleSuccessfulAuth(user){
        this.props.handleSuccessfulLogin(user);
        this.props.history.push("/inventory");   //Redirection to the home page
    }
    hadleUnsuccessfulAuth(){
        this.props.handleUnsuccessfulLogin();
    }
    render(){
        return(           
            <div className="auth-page-wrapper">
                <div className="left-column">
                    <img src={loginImg}/>                  
                </div>
                <div className="right-column">
                    <Login
                        hadleSuccessfulAuth = {this.hadleSuccessfulAuth}
                        hadleUnsuccessfulAuth = {this.hadleUnsuccessfulAuth}
                    />
                </div>
            </div>
        )
    }
}