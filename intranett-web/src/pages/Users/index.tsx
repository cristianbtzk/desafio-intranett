import React, { useState, useEffect, FormEvent } from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { Container, UsersContainer } from './styles';
import api from '../../services/api';
import Modal from '../../components/Modal';

interface User {
  id: string;
  name: string;
  permission: string;
}
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [permission, setPermission] = useState('');
  const [name, setName] = useState('');

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    try {
      const id = localStorage.getItem('@intranett:id');

      const response = await api.post(
        '/users',
        {
          email,
          password,
          name,
          permission,
        },
        {
          headers: {
            Authorization: id,
          },
        },
      );
      console.log(response);
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  useEffect(() => {
    const id = localStorage.getItem('@intranett:id');
    api
      .get(`/users`, {
        headers: {
          Authorization: id,
        },
      })
      .then(response => {
        setUsers(response.data);
      });
  }, []);

  return (
    <>
      {toggleModal && (
        <Modal page="form">
          <h1>Novo Usuário</h1>
          <form onSubmit={handleCreateUser}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
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
            <label htmlFor="permission">Permissão</label>
            <input
              id="permission"
              placeholder="Permissão"
              value={permission}
              onChange={e => setPermission(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <button type="button" onClick={() => setToggleModal(false)}>
            Cancelar
          </button>
        </Modal>
      )}

      <Header />
      <Container>
        <Menu />
        <UsersContainer>
          <p>Usuários</p>
          <table>
            <thead>
              <tr>
                <td>Nome</td>
                <td>Permissão</td>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.permission}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setToggleModal(!toggleModal)} type="button">
            Adicionar Usuário
          </button>
        </UsersContainer>
      </Container>
    </>
  );
};

export default Users;
