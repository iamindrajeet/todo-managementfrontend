import React, { useState } from "react";
import { registerAPICall } from "../services/AuthService";
import { toast } from "react-toastify";

const RegisterComponent = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateUserRegistration = () => {
    let valid = true;
    let newErrors = {}; // Create a new object to store the updated error messages
  
    if (userDetails.name.trim()) {
      newErrors.nameError = "";
    } else {
      newErrors.nameError = "Name is required";
      valid = false;
    }
  
    if (userDetails.username.trim()) {
      newErrors.usernameError = "";
    } else {
      newErrors.usernameError = "Username is required";
      valid = false;
    }
  
    if (userDetails.email.trim()) {
      newErrors.emailError = "";
      if (!isValidEmail(userDetails.email)) {
        newErrors.emailError = "Invalid email";
        valid = false;
      }
    } else {
      newErrors.emailError = "Email is required";
      valid = false;
    }
  
    // Password validation
    if (userDetails.password.trim()) {
      newErrors.passwordError = "";
      if (userDetails.password.length < 6) {
        newErrors.passwordError = "Password should be at least 6 characters long";
        valid = false;
      }
    } else {
      newErrors.passwordError = "Password is required";
      valid = false;
    }
  
    setErrors(newErrors); // Update the errors state with the new object
    console.log(newErrors);
    return valid;
  };

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  function handleRegistrationForm(e) {
    e.preventDefault();

    const validOrNot = validateUserRegistration();

    if (validOrNot) {
      registerAPICall(userDetails)
        .then((response) => {
          console.log(response.data);
          toast.success(response.data, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
         
        })
        .catch((error) => {
          console.error(error);
          toast.error("User couldn't be registered!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center"> User Registration Form </h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Name </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${
                        errors.nameError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                    />
                    {errors.nameError && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.nameError}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Username </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className={`form-control ${
                        errors.usernameError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter username"
                      value={userDetails.username}
                      onChange={handleInputChange}
                    ></input>
                    {errors.usernameError && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.usernameError}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Email </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="email"
                      className={`form-control ${
                        errors.emailError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter email address"
                      value={userDetails.email}
                      onChange={handleInputChange}
                    ></input>
                    {errors.emailError && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.emailError}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Password </label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${
                        errors.passwordError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter password"
                      value={userDetails.password}
                      onChange={handleInputChange}
                    ></input>
                    {errors.passwordError && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.passwordError}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleRegistrationForm}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
