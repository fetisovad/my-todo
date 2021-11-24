import React from 'react';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Список дел</a>
                    <button className="btn btn-outline-success" type="submit">Войти</button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;