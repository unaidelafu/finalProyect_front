import React, { Component } from "react";


//State
//Lifecycle hooks
//<comunicates APIs, etc
export default class WorkMenu extends Component{
    constructor(){
        super();
        //instancia
        //console.log("WorkMenu has rendered");
        this.state = {
            isLoading : false,
            dataToShow: "Orders"
        };
        this.handleFilter = this.handleFilter.bind(this);
        
    }


    handleFilter(filter){
        this.setState({
            dataToShow: filter          
        })
        console.log("El filtro: ", filter);
    }
    
    //lifecycle hook. Cuando se han cargado los componentes
    componentDidMount(){
        //this.getPorfolioItems();
    }

    render(){
        if(this.state.isLoading){
            return <div> Loading... </div>
        }
        /* */
        return(
            <div>
                <div className="work-wrapper">
                    <div className="work-menu-wrapper">
                        {/*en la funcion, se pone () => porque sino se ejecutan todas al iniciarse la page y error!! */}
                        <button className="btn" onClick={() => this.handleFilter('Orders')}>Orders</button>
                        <button className="btn" onClick={() => this.handleFilter('Bikes')}>Bikes</button>
                        <button className="btn" onClick={() => this.handleFilter('Pending')}>Pending</button>
                        <button className="btn" onClick={() => this.handleFilter('Processing')}>Processing</button>
                        <button className="btn" onClick={() => this.handleFilter('Stopped')}>Stopped</button>
                        <button className="btn" onClick={() => this.handleFilter('Finished')}>Finished</button>             
                        <button className="btn" onClick={() => this.handleFilter('Historic')}>Historic</button>
                    </div>
                </div>
            </div>
        );
    }
}