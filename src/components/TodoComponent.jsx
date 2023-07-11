import React, { useEffect, useState } from 'react';
import { getTodo, saveTodo } from '../services/TodoService';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TodoComponent = () => {

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false
  })

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const todoId = queryParams.get('todoid');

  const { search } = useLocation();
  const todoId = new URLSearchParams(search).get('todoid');

  const navigator = useNavigate()

  // const {id: todoId } = useParams();

  useEffect(() => {
    if(todoId){
        getTodo(todoId).then(response => {
          setTodo(response.data);
        }).catch(error => {
          console.log(error);
        })
    }
  }, [])
  

  const handleInputChange = (event) => {
      const{name, value} = event.target
      setTodo({...todo, [name]: value});
  }

  const saveOrUpdateTodo = (event) => {
    event.preventDefault();
    console.log(todo);

    saveTodo(todo).then((response) => {
      toast.success("Todo Details Added Successfully!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigator("/todos");

    })
    .catch((error) => {
      toast.error("Couldn't add Todo Details!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
      navigator("/todos");
    });
  }

  const pageTitle = () => {
    if(todoId){
      return <h2 className="text-center">Update Todo</h2>
    }else{
      return <h2 className="text-center">Add Todo</h2>
    }
  }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                  pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Title:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Todo Title'
                                name='title'
                                value={todo.title}
                                onChange={handleInputChange}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Description:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Todo Description'
                                name='description'
                                value={todo.description}
                                onChange={handleInputChange}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Completed:</label>
                            <select
                                className='form-control'
                                value={todo.completed}
                                name = "completed"
                                onChange={handleInputChange}
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>

                            </select>
                        </div>

                        <button type="submit" className='btn btn-success' onClick={saveOrUpdateTodo}>Add</button>
                    </form>

                </div>
            </div>

        </div>
    </div>
  )
};

export default TodoComponent;
