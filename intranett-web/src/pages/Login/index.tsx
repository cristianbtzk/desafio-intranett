import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { LoginContainer, Content } from './styles';

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <Content>
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
          <label htmlFor="password">Senha</label>
          <input type="password" id="passwrd" placeholder="Senha" />
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
