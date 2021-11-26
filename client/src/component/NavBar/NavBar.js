import React from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {AuthContext} from "../../context/AuthContext";

const NavBar = () => {
    const {logout, isLogin} = useAuth(AuthContext)

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