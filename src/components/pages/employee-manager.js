import React, {Component} from "react";
import axios from "axios";
import { API_url, API_port } from "../constants/global";
import EmployeesContainer from "../employees/employees-container"

export default class EmployeeManager extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            API_endpoint: API_url + ":" + API_port + "/",
            BBDDItems:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false
        };
        
    };

    get_employees(){
        //axios get
        var getCustomersEndpoint = this.state.API_endpoint + "employees"
        const axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
            });
            axiosInstance
            .get(getCustomersEndpoint)
            .then(response => {
                //Add the job of the previus person to Print the job on the header of emplyees-container
                if(Object.keys(response.data).length > 0){
                    var prevJob = "";
                    var preparedResponse = []
                    var employeeObj = {}
                    const iterated = response.data.map(employeeItem =>{
                        preparedResponse.push(employeeItem)
                        if(employeeItem.job != prevJob){
                            employeeObj = {...employeeItem}
                            employeeObj.prevJob = employeeObj.job
                            console.log("Los jobs: ", employeeItem.prevJob, employeeItem.job)
                            preparedResponse.push(employeeObj)
                        }
                        employeeItem.prevJob = prevJob
                        prevJob = employeeItem.job
                        console.log("PreparedResponse", preparedResponse)
                    })
                }              
                this.setState({
                    //BBDDItems: [...response.data]
                    BBDDItems: [...preparedResponse]
                })
                //console.log("BBDD_items:", this.state.BBDDItems);
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
        this.get_employees();
    }

    render(){
        return(
            <div className="employee-manager-wrapper"> 
                <EmployeesContainer
                data={this.state.BBDDItems}   
                />

            </div>

        );
    }    
}
