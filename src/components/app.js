import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//-->import axios from 'axios';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Todos los iconos que vayas a utilizar en toda la aplicacion
import { faTrash, faSignOutAlt, faEdit, faSpinner, faCirclePlus} from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from './navigation/navigation-container';
import Auth from "./pages/auth";
import Home from "./pages/home";
import Customers from "./pages/customers";
import Employees from "./pages/employees";
import Inventory from "./pages/inventory";
import Footer from './footer/footer';
import NoMatch from "./pages/no-match";


import EmployeeModal from "./modals/employee-modal.js";

library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faCirclePlus); //Añadir TODOS los iconos que se usa de fontAwesome

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedInStatus: "NOT_LOGGED_IN",
      userName: "",
      adminUser: 0,
      loggedUser: {},
      employeeModalIsOpen: false,
      employeeToEdit: {},
      ownUser: true
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.handleOwnUserEdit = this.handleOwnUserEdit.bind(this);

    this.handleSuccessfullNewSubmission = this.handleSuccessfullNewSubmission.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.clearEmployeeToEdit = this.clearEmployeeToEdit.bind(this);
    //this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }
  handleSuccessfulLogin(user){
    console.log("successfulLogin user", user.name_1)
    this.setState({
      loggedInStatus: "LOGGED_IN",
      //userName: name,
      userName: user.name_1 + " " + user.name_2,
      adminUser: user.admin,
      loggedUser: user
    })
  }
  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      userName: "",
      adminUser: 0,
      loggedUser: []
    })
  }  

  handleSuccessfulLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      userName: "",
      adminUser: 0,
      loggedUser: []
    })
  }  
  handleOwnUserEdit(){
    //call to the modal
    console.log("Editandome")
    this.setState({
      employeeToEdit: this.state.loggedUser,
      employeeModalIsOpen: true
    })
  }

 //EMployee Modal section:

 handleSuccessfullNewSubmission(userName){
  this.setState({
      employeeModalIsOpen: false,
      userName: userName
  })
}

handleModalClose(){
  this.setState({
      employeeModalIsOpen: false
  });     
}

clearEmployeeToEdit(){
  this.setState({
      employeeToEdit: {}
  })
}

//----

  componentDidMount(){
    //Siempre que se llega a esta pagina tiene como logout 
    this.handleSuccessfulLogout();
    console.log("estate:", this.state.loggedInStatus)
    //this.checkLoginStatus();
  }
  
/*
  authorizedPages(){
    return [
            <Route key="home" path="/home" component = {Home} />,
            <Route key="customers" path="/customers" component = {Customers} /> ,             
            <Route key="employees" path="/employees" component = {Employees} />,
            <Route key="inventory" path="/inventory" component = {Inventory} />
    ];
  }
  authprozedAdminPages(){
    return [<Route key="employees" path="/employees" component = {Employees} />];
  }
  
  */
  render() {
    return (
      <div className='container'>         
        <Router>
          <div>
            <NavigationContainer 
            loggedInStatus = {this.state.loggedInStatus}
            handleSuccessfulLogout = {this.handleSuccessfulLogout}
            handleOwnUserEdit = {this.handleOwnUserEdit}
            userName = {this.state.userName}
            adminUser = {this.state.adminUser}            
            />
            <EmployeeModal
            handleSuccessfullNewSubmission = {this.handleSuccessfullNewSubmission}
            handleModalClose={this.handleModalClose}            
            modalIsOpen = {this.state.employeeModalIsOpen} 
            employeeToEdit = {this.state.employeeToEdit}
            ownUser = {this.state.ownUser}
            clearEmployeeToEdit = {this.clearEmployeeToEdit}/>
            <Switch>
            <Route 
                path="/auth" 
                render = {props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin = {this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin = {this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route exact path="/customers" component = {Customers} />
              <Route exact path="/employees" component = {Employees} />
              <Route exact path="/inventory" component = {Inventory} />
              <Route exact path="/home" component = {Home} />
              {/*this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages(): null*/}
              <Route component = {NoMatch} /*Siempre al final, porque las pages funcionan como if else*//>        
            </Switch>

            <div className='app'>
              <p> <Footer/> </p>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
