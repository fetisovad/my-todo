import React from 'react';
import './MainPage.css'

const MainPage = () => {
    return (
        <div className='container'>
            <div className="input-group mb-3 mt-150 mb-50">
                <input type="text" className="form-control" placeholder="Введите задачу"
                       aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button className="btn btn-outline-secondary" type="button">Создать</button>
            </div>
            <ul className="list-group list-group-numbered">
                <li
                    className="list-group-item ta-s b df mb-15"
                >An item
                    <div className='ml-a'>
                        <button type='button' className='btn btn-success'>Выполнено</button>
                        <button type='button' className='btn btn-secondary'>Редактировать</button>
                        <button type='button' className='btn btn-danger'>Удалить</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default MainPage;