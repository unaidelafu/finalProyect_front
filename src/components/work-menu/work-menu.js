import React, { Component } from "react";


function WorkMenu({handleTableSelected}){
    return(
        <div>
            <div className="work-wrapper">
                <div className="work-menu-wrapper">
                    <button className="btn" onClick={() => handleTableSelected('Headers','')}>Orders</button>
                    <button className="btn" onClick={() => handleTableSelected('Lines','')}>Bikes</button>
                    <button className="btn" onClick={() => handleTableSelected('Lines','Pending')}>Pending</button>
                    <button className="btn" onClick={() => handleTableSelected('Lines','Processing')}>Processing</button>
                    <button className="btn" onClick={() => handleTableSelected('Lines','Stopped')}>Stopped</button>
                    <button className="btn" onClick={() => handleTableSelected('Lines','Finished')}>Finished</button>             
                    <button className="btn" onClick={() => handleTableSelected('Historic','')}>Historic</button>
                </div>
            </div>
        </div>
    );
}
export default WorkMenu
