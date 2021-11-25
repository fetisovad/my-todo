import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {AuthContext} from "../../context/AuthContext";

const NavBar = () => {
    const {logout} = useAuth(AuthContext)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('userId'))
        if(!item) {
            return null
        }
        setIsLogin(item.isLogin)
    }, [isLogin, setIsLogin])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Список дел</a>
                    {isLogin && (
                        <Link to='/login'>
                            <button className="btn btn-outline-success"
                                    type="submit"
                                    onClick={logout}
                            >Выйти
                            </button>
                        </Link>)
                    }
                </div>
            </nav>
        </div>
    );
};

export default NavBar;