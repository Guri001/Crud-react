import React from 'react'
import { removeEmployee } from '../service/localstorage';
import { getListEmployees } from '../service/localstorage';
import { useNavigate } from 'react-router-dom';

export const EmployeeItem = ({ employee, setEmployees }) => {
    const { id, name, email, phone } = employee;
    const navigate = useNavigate();

    const deleteEmployee = () => {
        removeEmployee(id);
        setEmployees(getListEmployees());
    }

    return (
        <tr className="table-primasry">
            <th>{name}</th>
            <td>{email}</td>
             <td>{phone}</td>
            <td>
                <div className="d-flex">
                    <span type="button" className="edit-btn" onClick={() => navigate(`/edit-employee/${id}`)}>Edit</span>
                    <span type="button" className="delete-btn" onClick={() => deleteEmployee()}>Delete</span>
                </div>
            </td>
        </tr>
    )
}
