import React, {useCallback, useEffect, useState} from 'react';
import './MainPage.css'
import {useHistory} from "react-router-dom";
import axios from "axios";

const MainPage = () => {
    const history = useHistory()
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')

    const isLogin = true
    if(!isLogin) {
        history.push('/login')
    }

    const getTodo = useCallback(async () => {
        const {userId} = JSON.parse(localStorage.getItem('userId'))

        await axios.get('/api/todo/', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {userId}
        })
            .then(res => {
                setTodos(res.data.reverse())
            })
            .catch(e => console.log(e))
    }, [setTodos])

    const handleAddTodo = useCallback(async (req, res) => {
        const {userId} = JSON.parse(localStorage.getItem('userId'))
        const todoItem = {
            text: todo, userId
        }

        await axios.post('/api/todo/add', {todoItem}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log('Add TODO')
                setTodo('')
                getTodo()
            })
            .catch(e => console.log(e))

    }, [todos, todo, getTodo])

    useEffect(() => {
        getTodo()
    }, [getTodo])

    const handleDelete = async (id) => {
        await axios.delete(`/api/todo/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {id}
        })
            .then(res => getTodo())
            .catch(e => console.log(e))
    }

    const handleDoneTodo = async (id) => {
        await axios.put(`api/todo/complete/${id}`, {id}, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {id}
        })
            .then((res) => {
                console.log(res)
                getTodo()
            })
            .catch(e => console.log({e}))
    }

    return (
        <div className='container'>
            <div className="input-group mb-3 mt-150 mb-50">
                <input name='text' type="text" className="form-control" placeholder="Введите задачу"
                       aria-label="Recipient's username" aria-describedby="button-addon2"
                       onChange={(e) => setTodo(e.target.value)}
                       value={todo}
                />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleAddTodo}
                    >Создать</button>
            </div>
            <ul className="list-group list-group-numbered">
                {todos.map((todo, index) => {
                    return (
                        <li key={todo.id}
                            className={todo.done ? "list-group-item ta-s b df mb-15 done" : "list-group-item ta-s b df mb-15"}
                        >{todo.text}
                            <div className='ml-a'>
                                <button type='button'
                                        className='btn btn-success'
                                        onClick={() => handleDoneTodo(todo.id)}
                                >Выполнено</button>
                                <button type='button' className='btn btn-secondary'>Редактировать</button>
                                <button type='button'
                                        className='btn btn-danger'
                                        onClick={() => handleDelete(todo.id)}
                                >Удалить</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default MainPage;