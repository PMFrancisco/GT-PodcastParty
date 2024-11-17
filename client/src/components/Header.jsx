import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Header.css';
import HomeLogo from '../assets/homepage-favicon.png';
import AltLogo from '../assets/logo.png';
import arrowIcon from '../assets/arrow-icon.png';
import menuIcon from '../assets/menu.png';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(window.innerWidth > 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTabletOrDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <header className="header">
      {isMobile ? (
        <>
          {isHomePage ? (
            <Link to="/" className="header__logo">
              <img src={HomeLogo} alt="Home Logo" />
            </Link>
          ) : (
            <div className="header__back" onClick={() => navigate(-1)}>
              <img src={arrowIcon} alt="Back" />
            </div>
          )}
          
          <button
            className="header__menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img src={menuIcon} alt="Menu" />
          </button>
          
          {isMenuOpen && (
            <div className="header__dropdown-menu">
              <ul>
                <li><Link to="/episodes" onClick={() => setIsMenuOpen(false)}>Episodios</Link></li>
                {isAuthenticated ? (
                  <>
                    <li><Link to="/favorites" onClick={() => setIsMenuOpen(false)}>Favoritos</Link></li>
                    <li><Link onClick={() => { onLogout(); setIsMenuOpen(false); }}>Logout</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Registrarse</Link></li>
                    <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link></li>
                  </>
                )}
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          <Link to="/" className="header__logo">
            <img src={isHomePage ? AltLogo : arrowIcon} alt="Desktop Logo" />
          </Link>

          {isTabletOrDesktop && (
            <div className="header__right">
              <nav className="header__nav">
                <ul className="nav__links">
                  <li><Link to="/episodes">Episodios</Link></li>
                  {isAuthenticated ? (
                    <>
                      <li><Link to="/favorites">Favoritos</Link></li>
                      <li><Link onClick={onLogout}>Logout</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/register">Registrarse</Link></li>
                      <li><Link to="/login">Iniciar Sesión</Link></li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          )}

          {!isHomePage && (
            <div className="header__back" onClick={() => navigate(-1)}>
              <img src={arrowIcon} alt="Back" />
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
