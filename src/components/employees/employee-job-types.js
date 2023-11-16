import React from "react";
import { Link } from "react-router-dom";

/*export default function BlogItem(){}*/ //Es lo mismo
const EmployeeJobTypes = props => {
    const{
        id, 
        name,
        admin,
    } = props.employeeJobType;
    return(
            <option value={id}>{name}</option>
    );
};
export default EmployeeJobTypes