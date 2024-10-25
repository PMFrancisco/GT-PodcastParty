import React from 'react';
import { Link } from "react-router-dom";
import './HomePage.css'
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Podcast Party Logo" className='' />
      </div>

      <div className='header__right'>
      <nav className="header__nav">
        <ul className="nav__links">
          <li><Link to="/episodes">Episodios</Link></li>
        </ul>
      </nav>
      <div className="header__auth">
        <button className="btn__register ">Registrarse</button>
        <button className="btn btn--login">Iniciar Sesión</button>
      </div>
      </div>
      
    </header>
  );
};

export default Header