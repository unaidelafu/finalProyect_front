import React, {Component} from "react";
import axios from "axios";
import { API_url, API_port } from "../constants/global";

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            user:"",
            password:"",
            errorText:"",
            API_endpoint: API_url + ":" + API_port + "/" + "employee-login",
            loggedUser: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value, //[para que lo reconozca el nombre dinamico del input como string y convertir en Key]
            errorText:""
        })
    }

    handleSubmit(event){
        //-----
        const formData = {sid : this.state.user, pswrd: this.state.password}
        const axiosInstance = axios.create({
        headers: {
            "Content-Type": "application/json"
        }
        });
        axiosInstance
        .put(this.state.API_endpoint, formData)
        .then(response => {
            if(response.data[0].id !== null){
                console.log("You can come in...");
                this.props.hadleSuccessfulAuth(response.data[0]);
                this.setState(
                    {
                        loggedUser: response.data[0]
                    })  
            }else{
                console.log("NOT ALLOWED");
                this.setState(
                    {
                        errorText: 'Wrong User or Password'
                    })  
                this.props.hadleUnsuccessfulAuth();              
            }
            console.log("response", response);
        }).catch(error => {
            console.log("Some error occurred", error)
            this.setState(
                {
                    errorText: 'An error ocurred' + error
                }
            )
            this.props.hadleUnsuccessfulAuth();
        });
        
        //los "submit", por defecto recargan la pagina y envian los datos en el url
        event.preventDefault(); //Evitas que ejecute su evento por defecto.
        
    }
    render(){
        return(
            <div>
                <h1>LOGIN TO ACCESS</h1>
                <p>{this.state.errorText}</p>

                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="user"
                        placeholder="Your user"
                        value={this.state.user}
                        onChange={this.handleChange}
                    />

                    <input 
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                
            </div>
        )
    }
}