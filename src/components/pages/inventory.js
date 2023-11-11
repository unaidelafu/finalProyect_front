import React, {Component} from "react";
import axios from "axios";
import { API_url, API_port } from "../constants/global";

export default class Inventory extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            API_endpoint: API_url + ":" + API_port + "/",
            blogItems:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false
        };

    };
    get_customers(){
        //axios get
        var getCustomersEndpoint = this.state.API_endpoint + "products"
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getCustomersEndpoint)
            .then(response => {
                console.log("Products!!");
                /*
                if(response.data[0].id !== null){                   
                    var name = response.data[0].name_1 + " " + response.data[0].name_2
                    var admin = response.data[0].admin
                    this.props.hadleSuccessfulAuth(name, admin);
                }else{
                    console.log("NOT ALLOWED");
                    this.setState(
                        {
                            errorText: 'Wrong User or Password'
                        })  
                    this.props.hadleUnsuccessfulAuth();              
                }
                */
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
    }

    componentDidMount(){
        this.get_customers();
      }
    render(){
        return(
            <div>
                <h1>Hi Inventory</h1>
            </div>
        );
    }    
}
