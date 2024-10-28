import React from 'react';
import { Link } from "react-router-dom";
import './Header.css'
import logo from '../assets/logopng.png';

const Header = () => {
  return (
    <header className="header">
     <Link to="/"><div className="header__logo">
       <img src={logo} alt="Podcast Party Logo" />
      </div>
      </Link> 

      <nav className="header__nav">
        <ul className="nav__links">
          <Link to="/episodes"><li>Episodios</li></Link>
          <Link to="/episodes"><li>Registrarte</li></Link>
          <Link to="/episodes"><li className='header__login'>Iniciar sesión</li></Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header