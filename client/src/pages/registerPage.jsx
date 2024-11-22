import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTokens, storeUser } from '../utils/indexedDB';
import './registerPage.css';
import blueLaptop from '../assets/blueLaptop.png';

const API_URL = import.meta.env.VITE_API_URL

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setModalMessage('Las contraseñas no coinciden');
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
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

        setModalMessage('¡Registro exitoso! Redirigiendo a la página principal...');
        setIsSuccess(true);
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigate('/');
        }, 2000);
      } else {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes('duplicate key')) {
          setModalMessage('¡Ese correo ya está en uso! Por favor, utiliza otro.');
        } else if (
          errorData.message &&
          errorData.message.includes('Password must be at least 8 characters')
        ) {
          setModalMessage(
            'La contraseña debe tener al menos 8 caracteres, incluir al menos un número y un carácter especial.'
          );
        } else {
          setModalMessage(errorData.message || 'Error al registrarse');
        }
        setIsSuccess(false);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage(`Error de red: ${error.message}`);
      setIsSuccess(false);
      setShowModal(true);
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
        <div className="modal__register">
          <div className="modal__register-content">
            <button className="modal__login-close" onClick={() => setShowModal(false)}>×</button>
            {isSuccess ? (
              <>
                <img src={blueLaptop} alt="laptop-image" />
                <h4 className="modal__title-register">¡Se ha realizado el registro con éxito!</h4>
                <p>Redirigiendo a la página principal</p>
              </>
            ) : (
              <p>{modalMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
