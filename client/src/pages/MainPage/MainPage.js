import React, {useEffect, useState} from 'react';
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

    const handleAddTodo = async (req, res) => {
        const {userId} = JSON.parse(localStorage.getItem('userId'))
        const todoItem = {
            text: todo, userId
        }

        await axios.post('/api/todo/add', {todoItem}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }

    const getTodo = async () => {
        const {userId} = JSON.parse(localStorage.getItem('userId'))

        await axios.get('/api/todo/', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {userId}
        })
            .then(res => setTodos(res.data))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getTodo()
    }, [getTodo])

    return (
        <div className='container'>
            <div className="input-group mb-3 mt-150 mb-50">
                <input name='text' type="text" className="form-control" placeholder="Введите задачу"
                       aria-label="Recipient's username" aria-describedby="button-addon2"
                       onChange={(e) => setTodo(e.target.value)}
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
                            className="list-group-item ta-s b df mb-15"
                        >{todo.text}
                            <div className='ml-a'>
                                <button type='button' className='btn btn-success'>Выполнено</button>
                                <button type='button' className='btn btn-secondary'>Редактировать</button>
                                <button type='button' className='btn btn-danger'>Удалить</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default MainPage;