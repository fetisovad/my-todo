import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
    const history = useHistory()
    const [dataForm, setDataForm] = useState({
        email: '',
        password: ''
    })

    const handleChangeForm = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        })
    }

    const handleRegistration = async (req, res) => {
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
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email" name='email'
                           aria-describedby="emailHelp"
                           onChange={handleChangeForm}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="mb-3 form-check">
                    <button
                        onClick={handleRegistration}
                        className="btn btn-primary mr-20"
                    >Зарегистрироваться
                    </button>
                    <Link to='/login'>Авторизоваться</Link>
                </div>
            </form>
        </div>
    );
};

export default RegistrationPage;