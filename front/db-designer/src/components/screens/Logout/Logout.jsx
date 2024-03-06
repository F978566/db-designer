import React from "react";
import { Link } from 'react-router-dom'
import './Logout.css'


const Logout = () => {
    return (
        <div className="logout-page">
          <div className="logout-content">
            <h1>Выход</h1>
            <p>Вы успешно вышли из системы.</p>
            <Link to="/">
              <button variant="primary">На главную</button>
            </Link>
          </div>
        </div>
      );
};

export default Logout;