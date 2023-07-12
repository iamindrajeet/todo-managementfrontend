import "./App.css";
import React from "react";
import ListTodoComponent from "./components/ListTodoComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import TodoComponent from "./components/TodoComponent";
import { ToastContainer } from "react-toastify";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route exact path="/" element={<LoginComponent />}></Route>

          {/* http://localhost:3000/todos */}
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* http://localhost:3000/add-todo */}
          <Route
            path="/add-todo"
            element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* http://localhost:3000/update-todo/id */}
          <Route
            path="/update-todo/:id"
            element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* http://localhost:3000/update-todo?poId=12 */}
          <Route
            path="/update-todo"
            element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>


          {/* http://localhost:8080/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>

          {/* http://localhost:8080/login */}
          <Route path="/login" element={<LoginComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
