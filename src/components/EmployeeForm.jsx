import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, editEmployee, getEmployeeById } from '../service/localstorage';
import { useForm } from './../hooks/useForm';
import uuid from 'react-uuid';
import "../styles/App.css"

export const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setshowAlert] = useState(false);
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (id) {
      const employee = getEmployeeById(id);
      setForm(employee);
    }
  }, [id]);

  const validateName = (name) => {
    if (name.trim() === '') {
      setNameError('Name is required');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError('Email is not valid');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePhone = (phone) => {
    if (isNaN(phone) || phone.trim() === '') {
      setPhoneError('Phone must be a valid number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameValid = validateName(inputValues.name);
    const isEmailValid = validateEmail(inputValues.email);
    const isPhoneValid = validatePhone(inputValues.phone);

    if (isNameValid && isEmailValid && isPhoneValid) {
      id ? editEmployee(id, inputValues) : addEmployee({ id: uuid(), ...inputValues });
      resetForm();
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
      }, 2000);
    }
  };

  return (
    <div>
      {showAlert && (
        <div>
          <div className="alert alert-success">
            <strong>Well done!</strong> {id ? "edit" : "added a new"} User.
          </div>
        </div>
      )}
      <div className="d-flex">
        <button type="button" className=" btn-secondary" onClick={() => navigate("/")}>
          Back
        </button>
        <h1 className="text-center">{id ? "Edit" : "Add new"} User for RoadCast</h1>
        <div />
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="inputValid">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={inputValues.name}
              onChange={handleInputChange}
              className="form-control"
              id="inputValid"
            />
            {nameError && <div className="text-danger">{nameError}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="inputValid">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={inputValues.email}
              onChange={handleInputChange}
              className="form-control"
              id="inputValid"
            />
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="inputValid">
              Phone
            </label>
            <input
              name="phone"
              type="number"
              value={inputValues.phone}
              onChange={handleInputChange}
              className="form-control"
              id="inputValid"
            />
            {phoneError && <div className="text-danger">{phoneError}</div>}
          </div>
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary btn-block">
              {id ? "Edit" : "Add"} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
