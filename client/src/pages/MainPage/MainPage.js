import React, {useCallback, useEffect, useState} from 'react';
import './MainPage.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
// import formatter from "../../utils/formatDate";
import {formatDate} from '../../utils/formatDate';

const MainPage = () => {
    const history = useHistory();
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [bodyCls, setBodyCls] = useState('body-enable');
    const [isLogin, setIsLogin] = useState(true);
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        priority: 'Средний',
        status: 'К выполнению',
    });

    const date = '2021.11.11 09:27:21';
    console.log(new Date(date).toLocaleString());

    const status = ['К выполнению', 'Выполняется', 'Выполнена', 'Отменена'];
    const priority = ['Высокий', 'Средний', 'Низкий'];

    console.log({todo});

    if (!isLogin) {
        history.push('/login');
    }

    const getTodo = useCallback(async () => {
        if (!JSON.parse(localStorage.getItem('userId'))) {
            return history.push('/login');
        }
        const {userId} = JSON.parse(localStorage.getItem('userId'));

        await axios
            .get('/api/todo/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {userId},
            })
            .then((res) => {
                setTodos(res.data.todos.reverse());
            })
            .catch((e) => console.log(e));
    }, [setTodos]);

    const handleAddTodo = useCallback(
        async (req, res) => {
            const {userId} = JSON.parse(localStorage.getItem('userId'));
            console.log('todo ' + todo);
            const todoItem = {
                title: todo.title,
                description: todo.description,
                userId,
                priority: todo.priority,
                status: todo.status,
            };
            console.log('todoItem ' + todoItem);

            await axios
                .post(
                    '/api/todo/add',
                    {todoItem},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((res) => {
                    console.log('Add TODO');
                    setTodo({
                        title: '',
                        description: '',
                    });
                    handleOpenModal();
                    getTodo();
                })
                .catch((e) => console.log(e));
        },
        [todos, todo, getTodo]
    );

    useEffect(() => {
        getTodo();
    }, [getTodo]);

    const handleDelete = async (id) => {
        await axios
            .delete(`/api/todo/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {id},
            })
            .then((res) => getTodo())
            .catch((e) => console.log(e));
    };

    const handleDoneTodo = async (id) => {
        await axios
            .put(
                `api/todo/complete/${id}`,
                {id},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {id},
                }
            )
            .then((res) => {
                console.log(res);
                getTodo();
            })
            .catch((e) => console.log({e}));
    };

    const handleOpenModal = () => {
        setOpenModal(!openModal);
        bodyCls === 'body-enable'
            ? setBodyCls('body-disable')
            : setBodyCls('body-enable');
    };

    const handleEditTodo = async (id) => {
        setIsEdit(true);
        handleOpenModal();

        await axios
            .get(`api/todo/edit/${id}`, {
                headers: {
                    'Content-type': 'application/json',
                },
                params: {id},
            })
            .then((res) => setTodo(res.data))
            .catch((e) => console.log(e));
    };

    const handleSaveEditTodo = (id) => {
        axios
            .put(
                `/api/todo/edit/${id}`,
                {todo},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {
                console.log(res);
                handleOpenModal();
                setTodo({
                    title: '',
                    description: '',
                    priority: 'Средний',
                    status: 'К выполнению',
                });
                getTodo();
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className="container">
            <div className={bodyCls}/>
            <h1>Список задач</h1>
            <div className="input-group mb-3 mb-50">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleOpenModal}
                >
                    Добавить задачу
                </button>
            </div>
            {openModal && (
                <div className="modalWindow">
                    <h4>Добавить задачу</h4>
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">
                                Заголовок
                            </label>
                            <input
                                name="text"
                                type="text"
                                className="form-control"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                onChange={(e) =>
                                    setTodo({...todo, title: e.target.value})
                                }
                                value={todo.title}
                            />
                        </div>
                        <div className="mb-3 column">
                            <label htmlFor="description" className="form-label">
                                Описание
                            </label>
                            <textarea
                                className="description"
                                name="description"
                                id="description"
                                onChange={(e) =>
                                    setTodo({
                                        ...todo,
                                        description: e.target.value,
                                    })
                                }
                                value={todo.description}
                                cols="30"
                                rows="10"
                            />
                        </div>
                    </form>
                    <div
                        className="row"
                        style={{justifyContent: 'flex-start'}}
                    >
                        <ul
                            className="list-group list-group-flush w-45"
                            style={{padding: 0}}
                        >
                            <span className="mb-15">Приоритет</span>
                            {priority.map((priority) => (
                                <a
                                    style={{width: '100%'}}
                                    role="button"
                                    key={priority}
                                    className={
                                        todo.priority === priority
                                            ? 'list-group-item active'
                                            : 'list-group-item'
                                    }
                                    onClick={() =>
                                        setTodo({...todo, priority: priority})
                                    }
                                >
                                    {priority}
                                </a>
                            ))}
                        </ul>
                        {isEdit ? (
                            <ul
                                className="list-group list-group-flush w-45"
                                style={{padding: 0, marginLeft: 'auto'}}
                            >
                                <span className="mb-15">Статус</span>
                                {status.map((status) => (
                                    <a
                                        style={{width: '100%'}}
                                        role="button"
                                        key={status}
                                        className={
                                            todo.status === status
                                                ? 'list-group-item active'
                                                : 'list-group-item'
                                        }
                                        onClick={() =>
                                            setTodo({...todo, status: status})
                                        }
                                    >
                                        {status}
                                    </a>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                    <div className="modal-footer mt-15">
                        {isEdit ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleSaveEditTodo(todo.id)}
                            >
                                Сохранить задачу
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddTodo}
                            >
                                Добавить задачу
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                handleOpenModal();
                                setIsEdit(false);
                                setTodo({
                                    title: '',
                                    description: '',
                                    priority: 'Средний',
                                    status: 'К выполнению',
                                });
                            }}
                        >
                            Отменить
                        </button>
                    </div>
                </div>
            )}
            <ul className="list-group">
                {todos.length ? (
                    todos.map((todo, index) => (
                        <li
                            key={todo.id}
                            className={
                                todo.done
                                    ? 'card border-success mb-3 done '
                                    : 'card border-success mb-3 '
                            }
                            style={{display: 'flex', flexDirection: 'column'}}
                        >
                            <ul
                                className="card-header bg-transparent border-success"
                                style={{display: 'flex', listStyle: 'none'}}
                            >
                                <li>
                                    Дата создания: {formatDate(todo.createdAt)}
                                </li>
                                <li style={{marginLeft: '20px'}}>
                                    Дата изменения: {formatDate(todo.updatedAt)}
                                </li>
                                <li style={{marginLeft: '20px'}}>
                                    Дата окончания: {formatDate(date)}
                                </li>
                                <li style={{marginLeft: 'auto'}}>
                                    {todo.priority}
                                </li>
                                <li style={{marginLeft: 'auto'}}>
                                    {todo.status}
                                </li>
                            </ul>
                            <div
                                className="card-body text-success"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                }}
                            >
                                <h4
                                    className="card-title"
                                    style={{
                                        maxWidth: '100%',
                                        textAlign: 'left',
                                    }}
                                >
                                    {todo.title}
                                </h4>
                                <p
                                    className="card-text"
                                    style={{
                                        maxWidth: '100%',
                                        textAlign: 'left',
                                    }}
                                >
                                    {todo.description}
                                </p>
                            </div>
                            <div
                                className="card-footer bg-transparent border-success"
                                style={{display: 'flex'}}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    }}
                                >
                                    <span style={{marginRight: '10px'}}>
                                        Создатель: {todo.author.name}{' '}
                                        {todo.author.secondName}
                                    </span>
                                    <span>
                                        Ответственный: {todo.responsible.name}{' '}
                                        {todo.responsible.secondName}
                                    </span>
                                </div>
                                <div className="ml-a">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        style={{marginLeft: '10px'}}
                                        onClick={() => handleDoneTodo(todo.id)}
                                    >
                                        Выполнено
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        style={{marginLeft: '10px'}}
                                        onClick={() => handleEditTodo(todo.id)}
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        style={{marginLeft: '10px'}}
                                        onClick={() => handleDelete(todo.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Задач пока нет</p>
                )}
            </ul>
        </div>
    );
};

export default MainPage;
