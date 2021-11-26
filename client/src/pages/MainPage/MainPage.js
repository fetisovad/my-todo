import React, {useCallback, useEffect, useState} from 'react';
import './MainPage.css'
import {useHistory} from "react-router-dom";
import axios from "axios";

const MainPage = (factory, deps) => {


    const history = useHistory()
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        priority: 'Средний',
        status: 'К выполнению',
    })

    const status = ["К выполнению", "Выполняется", "Выполнена", "Отменена"]
    const priority = ["Высокий", "Средний", "Низкий"]

    console.log({todo})

    const [openModal, setOpenModal] = useState(false)

    const isLogin = true
    if (!isLogin) {
        history.push('/login')
    }

    const getTodo = useCallback(async () => {
        if (!JSON.parse(localStorage.getItem('userId'))) {
            return history.push('/login')
        }
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
        console.log('todo ' + todo)
        const todoItem = {
            title: todo.title,
            description: todo.description,
            userId,
            priority: todo.priority,
            status: todo.status
        }
        console.log('todoItem ' + todoItem)

        await axios.post('/api/todo/add', {todoItem}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log('Add TODO')
                setTodo({
                    title: '',
                    description: ''
                })
                handleOpenModal()
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

    const handleOpenModal = () => {
        let body = window.document.body.className
        setOpenModal(!openModal)
        body === 'openModal' ? body = 'z-1' : body = 'openModal'
    }

    const handleEditTodo = async (id) => {
        handleOpenModal()

        await axios.get(`api/todo/edit/${id}`, {
            headers: {
                'Content-type': 'application/json'
            },
            params: {id}
        })
            .then(res => setTodo(res.data))
            .catch(e => console.log(e))
    }

    return (
        <div className='container'>
            <h1>Список задач</h1>

            <div className="input-group mb-3 mb-50">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    // onClick={handleAddTodo}
                    onClick={handleOpenModal}
                >Добавить задачу
                </button>
            </div>
            {openModal && (
                <div className='modalWindow'>
                    <h4>Добавить задачу</h4>
                    <form onSubmit={event => event.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">Заголовок</label>
                            <input name='text' type="text" className="form-control"
                                   aria-label="Recipient's username" aria-describedby="button-addon2"
                                   onChange={(e) => setTodo({...todo, title: e.target.value})}
                                   value={todo.title}
                            />
                        </div>
                        <div className="mb-3 column">
                            <label htmlFor="description" className="form-label">Описание</label>
                            <textarea className='description'
                                      name="description"
                                      id="description"
                                      onChange={(e) => setTodo({...todo, description: e.target.value})}
                                      value={todo.description}
                                      cols="30" rows="10"/>
                        </div>
                    </form>
                    <div className='row'>
                        <ul className="list-group list-group-flush w-50">
                            <span className='mb-15'>Приоритет</span>
                            {priority.map((priority) => (
                                <a role='button'
                                   key={priority}
                                   className={todo.priority === priority ? "list-group-item active" : "list-group-item"}
                                   onClick={() => setTodo({...todo, priority: priority})}
                                >{priority}</a>
                            ))}
                        </ul>
                    </div>
                    <div className="modal-footer mt-15">
                        <button type="button" className="btn btn-primary"
                                onClick={handleAddTodo}
                        >Сохранить изменения
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={handleOpenModal}
                        >Отменить
                        </button>
                    </div>
                </div>
            )}

            <ul className="list-group list-group-numbered">
                {todos.length
                    ?
                    todos.map((todo, index) => (
                        <li key={todo.id}
                            className={todo.done ? "list-group-item ta-s b df mb-15 done" : "list-group-item ta-s b df mb-15"}
                        >{todo.title}
                            <div className='ml-a'>
                                <button type='button'
                                        className='btn btn-success'
                                        onClick={() => handleDoneTodo(todo.id)}
                                >Выполнено
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={() => handleEditTodo(todo.id)}
                                >Редактировать
                                </button>
                                <button type='button'
                                        className='btn btn-danger'
                                        onClick={() => handleDelete(todo.id)}
                                >Удалить
                                </button>
                            </div>
                        </li>
                    ))
                    :
                    (<p>Задач пока нет</p>)
                }
            </ul>
        </div>
    );
};

export default MainPage;