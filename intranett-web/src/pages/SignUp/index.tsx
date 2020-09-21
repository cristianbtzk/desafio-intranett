import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { SignUpContainer, Content } from './styles';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const history = useHistory();
  const [accountName, setAccountName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await api.post('/accounts', {
        accountName,
        userName,
        email,
        password,
      });
      alert('Cadastrado com sucesso');
      history.push('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <SignUpContainer>
      <Content>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="accountName">Nome do seu negócio</label>
          <input
            id="accountName"
            placeholder="Nome do negócio"
            required
            value={accountName}
            onChange={e => setAccountName(e.target.value)}
          />
          <label htmlFor="userName">Nome do usuário</label>
          <input
            id="userName"
            placeholder="Seu nome"
            required
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/">
          <FiArrowLeft />
          Já sou cadastrado.
        </Link>
      </Content>
    </SignUpContainer>
  );
};

export default SignUp;
