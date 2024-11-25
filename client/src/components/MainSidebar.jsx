import React from 'react';
import { Link } from 'react-router-dom';
import "./MainSidebar.css";

const MainSidebar = ({ isAuthenticated, onLogout }) => {
  return (
    <>
      {isAuthenticated ? (
        <div className="podcastList__asideLogin">
          <div className="podcastList__aside-titleLogin"></div>
          <div className="podcastList__aside-bannerLogin">
            <Link to="/episodes" className="podcastList__aside-list">
              Episodios
            </Link>
            <Link to="/last-listened" className="podcastList__aside-list">
              Historial
            </Link>
            <Link to="/favorites" className="podcastList__aside-list">
              Favoritos
            </Link>
            <Link
              to="#"
              onClick={() => {
                onLogout();
              }}
              className="podcastList__aside-list"
            >
              Cerrar Sesión
            </Link>
          </div>
        </div>
      ) : (
        <div className="podcastList__aside">

          <Link to="/login" className="podcastList__aside-button">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="podcastList__aside-button">
            Registrarte
          </Link>
        </div>
      )}
    </>
  );
};

export default MainSidebar;
