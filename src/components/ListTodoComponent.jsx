import React, { useEffect, useState } from "react";
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAdminUser } from "../services/AuthService";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listAllTodos();
  }, []);

  const listAllTodos = () => {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewTodo = () => {
    navigator("/add-todo");
  };

  // const updateTodo = (todoId) => {
  //   navigator(`/update-todo/${todoId}`);
  // };

  const updateTodo = (todoId) => {
    navigator(`/update-todo?todoid=${todoId}`);
  };

  const markCompleteTodo = (todoId) => {
    completeTodo(todoId).then(response => {
      listAllTodos();
    }).catch(error => {
      console.log(error)
    })
  }

  const markIncompleteTodo = (todoId) => {
    incompleteTodo(todoId).then(response => {
      listAllTodos();
    }).catch(error => {
      console.log(error)
    })
  }

  const isAdmin = isAdminUser();

  const removeTodo = (todoId) => {
    deleteTodo(todoId)
      .then((response) => {
        toast.success("Todo Details Deleted Successfully!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        listAllTodos();
      })
      .catch((error) => {
        toast.error("Couldn't delete Todo Details!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        listAllTodos();
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List of Todos</h2>
      {
        isAdmin && 
        <button className="btn btn-primary mb-2" onClick={addNewTodo}>
          Add Todo
        </button>
      }
      
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>To Title</th>
            <th>Todo Description</th>
            <th>Todo Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.completed ? "YES" : "NO"}</td>
              <td>
                {
                  isAdmin &&
                  <button type="button" className="btn btn-info" onClick={() => updateTodo(todo.id)}>
                    Update
                  </button>

                }
                {
                  isAdmin && 
                  <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeTodo(todo.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
                }

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => markCompleteTodo(todo.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Complete
                </button>

                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => markIncompleteTodo(todo.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Incomplete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodoComponent;
