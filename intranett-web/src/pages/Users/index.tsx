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
  const [permission, setPermission] = useState('Colaborador');
  const [name, setName] = useState('');

  async function handleCreateUser(e: FormEvent<HTMLFormElement>) {
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
      alert('Usuário cadastrado');
      setUsers([...users, response.data]);
      setToggleModal(false);
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
            <select
              onChange={e => {
                setPermission(e.target.value);
              }}
              id="permission"
            >
              <option value="Colaborador">Colaborador</option>
              <option value="Gestor">Gestor</option>
            </select>
            <div>
              <button type="button" onClick={() => setToggleModal(false)}>
                Cancelar
              </button>
              <button type="submit">Criar</button>
            </div>
          </form>
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
          {localStorage.getItem('@intranett:permission') === 'Gestor' && (
            <button onClick={() => setToggleModal(!toggleModal)} type="button">
              Adicionar Usuário
            </button>
          )}
        </UsersContainer>
      </Container>
    </>
  );
};

export default Users;
