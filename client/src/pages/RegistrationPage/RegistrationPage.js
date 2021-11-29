import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
    const history = useHistory()
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
        secondName: '',
        name: '',
        patronymic: '',
        executive: 'Руководитель 2',
        role: 'USER'
    })

    console.log(dataForm)

    const handleChangeForm = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        })
    }


    const handleRegistration = async () => {
        await axios.post('/api/auth/registration', {dataForm}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data)
                history.push('/login')
            })
            .catch((e) => {
                alert(e.response.data)
            })
    }

    return (
        <div className='container'>
            <h1>Регистрация</h1>
            <form onSubmit={(event => event.preventDefault())}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email</label>
                    <input type="email"
                           className="form-control"
                           id="email" name='email'
                           aria-describedby="emailHelp"
                           onChange={handleChangeForm}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="secondName" className="form-label">Фамилия</label>
                    <input
                        type="text"
                        className="form-control"
                        id="secondName"
                        name='secondName'
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Имя</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name='name'
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="patronymic" className="form-label">Отчество</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patronymic"
                        name='patronymic'
                        onChange={handleChangeForm}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}} className='mb-3'>
                    <div style={{display: 'flex'}}>
                        <div className="form-check">
                            <input style={{marginRight: '15px'}} className="form-check-input" type="radio" name="executive" id="executive1"
                                   value='Руководитель 1' onChange={(e) => setDataForm({...dataForm, executive: e.target.value})}/>
                            <label style={{marginRight: '10px'}} className="form-check-label" htmlFor="executive1">
                                Руководитель 1
                            </label>
                        </div>
                        <div className="form-check">
                            <input style={{marginRight: '15px'}} className="form-check-input" type="radio" name="executive" id="executive2"
                                   value='Руководитель 2' onChange={(e) => setDataForm({...dataForm, executive: e.target.value})} defaultChecked/>
                            <label style={{marginRight: '10px'}} className="form-check-label" htmlFor="executive2">
                                Руководитель 2
                            </label>
                        </div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className="form-check" >
                            <input style={{marginRight: '15px'}} className="form-check-input" type="radio" name="role" id="admin"
                                   value='ADMIN' onChange={(e) => setDataForm({...dataForm, role: e.target.value})}/>
                            <label style={{marginRight: '10px'}} className="form-check-label" htmlFor="admin">
                                ADMIN
                            </label>
                        </div>
                        <div className="form-check" >
                            <input style={{marginRight: '15px'}} className="form-check-input" type="radio" name="role" id="user"
                                   value='USER' onChange={(e) => setDataForm({...dataForm, role: e.target.value})} defaultChecked/>
                            <label style={{marginRight: '10px'}} className="form-check-label" htmlFor="user">
                                USER
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mb-3 form-check">
                    <button
                        onClick={handleRegistration}
                        className="btn btn-primary"
                        style={{marginRight: 20}}
                    >Зарегистрироваться
                    </button>
                    <Link to='/login'>Авторизоваться</Link>
                </div>
            </form>
        </div>
    );
};

export default RegistrationPage;