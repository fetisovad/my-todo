import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './LoginPage.css'
import axios from "axios";
import {useHistory} from 'react-router-dom'
import {useAuth} from "../../hooks/useAuth";
import {AuthContext} from "../../context/AuthContext";

const LoginPage = () => {
    const history = useHistory()
    const {login, logout} = useAuth(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChangeForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (req, res) => {
        await axios.post('/api/auth/login', {formData}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                const userId = res.data.userId
                login(JSON.stringify({
                    userId,
                    isLogin: true
                }))

                history.push('/')
            })
            .catch((e) => {
                alert(e.response.data)
            })
    }

    return (
        <div className='container'>
            <h1>Авторизация</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
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
                        type="submit"
                        className="btn btn-primary mr-20"
                        onClick={handleLogin}
                    >Войти
                    </button>
                    <Link to='/registration'>Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;