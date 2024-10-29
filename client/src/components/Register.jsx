import React, { useState } from 'react';
import register from './regiser.css';

const RegisterPage = ({ onAuthenticate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://gt-podcastparty-so1e.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error al registrarse');
      }

      const { accessToken, refreshToken } = await response.json();
      onAuthenticate(accessToken, refreshToken); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
