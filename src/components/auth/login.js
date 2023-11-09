import React, {Component} from "react";
import axios from "axios";

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email:"",
            password:"",
            errorText:""
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
        
        axios.post("https://api.devcamp.space/sessions",
            {
                client: {
                    email: this.state.email,
                    password: this.state.password
                }
            },
            { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'created'){
                console.log("You can come in...")
                this.props.hadleSuccessfulAuth();
            }else{
                this.setState({
                    errorText: "Wrong email or password"
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
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
                <h2>{this.state.email}</h2>
                <h2>{this.state.errorText}</h2>

                {/*<form onSubmit={this.handleSubmit}>*/}
                <form>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={this.state.email}
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