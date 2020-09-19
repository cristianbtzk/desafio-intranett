import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { LoginContainer, Content } from './styles';
import api from '../../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });
      localStorage.setItem('@intranett:id', response.data.id);
      localStorage.setItem('@intranett:permission', response.data.permission);
      history.push('/tasks');
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <LoginContainer>
      <Content>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="passwrd"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <Link to="signup">
          <FiLogIn />
          Crie uma conta para a sua empresa
        </Link>
      </Content>
    </LoginContainer>
  );
};

export default Login;
