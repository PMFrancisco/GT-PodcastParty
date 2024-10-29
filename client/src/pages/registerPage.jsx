import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTokens, storeUser } from '../utils/indexedDB';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
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

        navigate('/');
      } else {
        console.error('Error al registrarse');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="register-button" type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
