import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
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

const Teams: React.FC = () => {
  const [teamUsers, setTeamUsers] = useState<User[]>([]);
  const [addToTeamUsers, setAddToTeamUsers] = useState<User[]>([]);
  const [userToAddId, setUserToAddId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [toggleCreateTeamModal, setToggleCreateTeamModal] = useState(false);
  const [toggleAddToTeamModal, setToggleAddToTeamModal] = useState(false);
  async function handleCreateTeam(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = localStorage.getItem('@intranett:id');

    try {
      await api.post(
        '/teams',
        {
          name: teamName,
        },
        {
          headers: {
            Authorization: id,
          },
        },
      );

      alert('Equipe criada com sucesso');
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  async function handleAddToTeam(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = localStorage.getItem('@intranett:id');

    try {
      await api.post(
        '/teamsusers',
        {
          id: userToAddId,
        },
        {
          headers: {
            Authorization: id,
          },
        },
      );
      setToggleAddToTeamModal(false);
      alert('Usuário inserido na equipe');
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  useEffect(() => {
    const id = localStorage.getItem('@intranett:id');

    try {
      api
        .get('/teams', {
          headers: {
            Authorization: id,
          },
        })
        .then(response => {
          setTeamUsers(response.data);
        });
    } catch (err) {
      alert(err.response.data);
    }
  }, []);

  useEffect(() => {
    const id = localStorage.getItem('@intranett:id');

    try {
      api
        .get('/teamsusers', {
          headers: {
            Authorization: id,
          },
        })
        .then(response => {
          setAddToTeamUsers(response.data);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  }, []);
  return (
    <>
      {toggleCreateTeamModal && (
        <Modal page="form">
          <h1>Nova Equipe</h1>
          <form onSubmit={handleCreateTeam}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              placeholder="Nome"
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
            />

            <div>
              <button
                type="button"
                onClick={() => setToggleCreateTeamModal(false)}
              >
                Cancelar
              </button>
              <button type="submit">Criar</button>
            </div>
          </form>
        </Modal>
      )}
      {toggleAddToTeamModal && (
        <Modal page="form">
          <h1>Adicionar usuário ao time</h1>
          <form onSubmit={handleAddToTeam}>
            <label htmlFor="user">Usuário</label>
            <select
              onChange={e => {
                setUserToAddId(e.target.value);
              }}
              id="user"
            >
              <option value="" hidden>
                Selecione uma opção
              </option>
              {addToTeamUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div>
              <button
                type="button"
                onClick={() => setToggleAddToTeamModal(false)}
              >
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
          <p>Minha Equipe</p>
          <table>
            <thead>
              <tr>
                <td>Nome</td>
                <td>Permissão</td>
                <td>Ações</td>
              </tr>
            </thead>
            <tbody>
              {teamUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.permission}</td>
                  <td>
                    {localStorage.getItem('@intranett:permission') ===
                      'Gestor' && (
                      <Link to={`teamtasks/${user.id}`}>Ver tarefas</Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {teamUsers.length === 0 &&
            localStorage.getItem('@intranett:permission') === 'Gestor' && (
              <button
                onClick={() => setToggleCreateTeamModal(!toggleCreateTeamModal)}
                type="button"
              >
                Criar Equipe
              </button>
            )}

          {teamUsers.length !== 0 &&
            localStorage.getItem('@intranett:permission') === 'Gestor' && (
              <button
                onClick={() => setToggleAddToTeamModal(!toggleAddToTeamModal)}
                type="button"
              >
                Adicionar membro à equipe
              </button>
            )}
        </UsersContainer>
      </Container>
    </>
  );
};

export default Teams;
