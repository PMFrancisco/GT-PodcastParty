import React from 'react';
import { Link } from "react-router-dom";
import './HomePage.css'

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        {/*<img src="/assets/logo.png" alt="Podcast Party Logo" />*/}
      </div>

      <nav className="header__nav">
        <ul className="nav__links">
          <li><Link to="/">Nosotros</Link></li>
          <li><Link to="/episodes">Episodios</Link></li>
          <li><a href="#comunidad">Comunidad</a></li>
        </ul>
      </nav>
      
      <div className="header__auth">
        <button className="btn btn--login">Sign In</button>
        <button className="btn btn--register">Register</button>
      </div>
    </header>
  );
};

export default Header