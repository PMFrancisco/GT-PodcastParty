import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTokens, storeUser } from '../utils/indexedDB';
import './registerPage.css';
import blueLaptop from '../assets/blueLaptop.png';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('https://gt-podcastparty-so1e.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        const data = await response.json();
        
        await storeTokens(data.accessToken, data.refreshToken);
        await storeUser({ email });

        setShowModal(true); 

        setTimeout(() => {
          setShowModal(false); 
          navigate('/');
        }, 2000);
      } else {
        console.error('Error al registrarse');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="register__main">
      <div className="register__container">
        <form className="register__form" onSubmit={handleRegister}>
          <label className="register__label" htmlFor="email">Email</label>
          <input
            className="register__input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="register__label" htmlFor="password">Contraseña</label>
          <input
            className="register__input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="register__label" htmlFor="repeatPassword">Repetir Contraseña</label>
          <input
            className="register__input"
            type="password"
            placeholder="Repetir Contraseña"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          <button className="register__button" type="submit">Crear cuenta</button>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <img src={blueLaptop} alt="laptop-image" />
            <h4 className='modal__title-register'>¡Se ha realizado el registro con éxito!</h4>
            <p>Redirigiendo a la página principal</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;


