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
import { faTrash, faSignOutAlt, faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from './navigation/navigation-container';
import Auth from "./pages/auth";
import Home from "./pages/home";
import Customers from "./pages/customers";
import EmployeeManager from "./pages/employee-manager";
import Inventory from "./pages/inventory";

library.add(faTrash, faSignOutAlt, faEdit, faSpinner); //Añadir TODOS los iconos que se usa de fontAwesome

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedInStatus: "NOT_LOGGED_IN",
      userName: "Jokin",
      adminUser: 0
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    //this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }
  handleSuccessfulLogin(name,admin){
    console.log("successfulLogin", name)
    this.setState({
      loggedInStatus: "LOGGED_IN",
      userName: name,
      adminUser: admin
    })
  }
  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }  

  handleSuccessfulLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }  

 
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
            userName = {this.state.userName}
            adminUser = {this.state.adminUser}            
            />
            <Switch>
            <Route 
                path="/auth" 
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin = {this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin = {this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route path="/customers" component = {Customers} />
              <Route path="/employees" component = {EmployeeManager} />
              <Route path="/inventory" component = {Inventory} />
              <Route path="/home" component = {Home} />
              {/*this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages(): null*/}
         
            </Switch>

            <div className='app'>
              <h1>Unai de la fuente </h1>
              <h2>React Redux Router</h2>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
