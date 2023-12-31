import React, { useState } from "react";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;

    let newErrors = {};

    if (!username) {
      newErrors.usernameError = "UserName or Email is required";
      valid = false;
    } else {
      newErrors.usernameError = "";
    }

    if (!password) {
      newErrors.passwordError = "Password is required";
      valid = false;
    } else {
      newErrors.passwordError = "";
    }

    setErrors(newErrors);
    console.log(errors);
    return valid;
  };

  const navigator = useNavigate();

  const handleLoginForm = async (event) => {
    event.preventDefault();

    const loginObj = { username, password };

    console.log(loginObj);

    const validOrNot = validateForm();

    if (validOrNot) {
      await loginAPICall(username, password)
        .then((response) => {
          console.log(response.data);

          //const token = 'Basic ' + window.btoa(username + ":" + password);
          const token = "Bearer " + response.data.accessToken;

          const role = response.data.role;

          storeToken(token);

          saveLoggedInUser(username, role);

          navigator("/todos");
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error.response.status);
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            toast.error("Invalid Username or password", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    }
  };

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center"> Login Form </h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">
                    Username or Email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className={`form-control ${
                        errors.usernameError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    {errors.usernameError && (
                      <div className="invalid-feedback">
                        {errors.usernameError}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {errors.passwordError && (
                      <div className="invalid-feedback">
                        {errors.passwordError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleLoginForm(e)}
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

export default LoginComponent;
