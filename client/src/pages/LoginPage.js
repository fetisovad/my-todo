import React from 'react';
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div className='container'>
            <h1>Авторизация</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password'/>
                </div>
                <div className="mb-3 form-check">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/registration'>Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;