import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Список дел</a>
                    <Link to='/login'>
                        <button className="btn btn-outline-success" type="submit">Войти</button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;