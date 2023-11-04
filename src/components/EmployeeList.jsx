import React, { useEffect, useState } from 'react';
import { EmployeeItem } from './EmployeeItem';
import { getListEmployees } from './../service/localstorage';
import "../styles/App.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    useEffect(() => {
        setEmployees(getListEmployees());
    }, []);

    useEffect(() => {
        
        const sorted = [...employees].sort((a, b) => a.name.localeCompare(b.name));
        setSortedEmployees(sorted);
    }, [employees]);

   
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

  
    const itemsToDisplay = sortedEmployees.slice(startIndex, endIndex);

    return (
        <div>
            <h1 className="table-heading">User Table</h1>

            {
                itemsToDisplay.length > 0 ? (
                    <div className="card bg-secondary p-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsToDisplay.map(employee => (
                                    <EmployeeItem employee={employee} key={employee.id} setEmployees={setEmployees} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="text-center">No User</h3>
                )
            }

            <div className="pagination">
               
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= sortedEmployees.length}>Next</button>
            </div>
        </div>
    )
}
