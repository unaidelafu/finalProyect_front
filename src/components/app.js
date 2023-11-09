import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//-->import axios from 'axios';

//-->import { library } from "@fortawesome/fontawesome-svg-core";
//-->import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Todos los iconos que vayas a utilizar en toda la aplicacion
//-->import { faTrash, faSignOutAlt, faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from './navigation/navigation-container';
import Auth from "./pages/auth";
import Home from "./pages/home";
import Customers from "./pages/customers";
import Employees from "./pages/employees";
import Inventory from "./pages/inventory";

export default class App extends Component {
  render() {
    return (
      <div className='container'>         
        <Router>
          <div>
            <NavigationContainer 
            />
            <Switch>
              <Route path="/auth" component = {Auth} />
              <Route path="/home" component = {Home} />
              <Route path="/customers" component = {Customers} />              
              <Route path="/employees" component = {Employees} />
              <Route path="/inventory" component = {Inventory} />                   
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
