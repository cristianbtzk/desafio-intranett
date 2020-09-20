import React, { useState, useEffect, FormEvent } from 'react';
import { GiCancel } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { Container, TasksContainer } from './styles';
import api from '../../services/api';
import Modal from '../../components/Modal';

interface Task {
  id: string;
  name: string;
  status: string;
  start: Date;
  end: Date | null;
  cancelled_at: Date | null;
  cancellation_reason: string | null;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  const [toggleTaskDetailsModal, setToggleTaskDetailsModal] = useState(false);
  const [taskToDetail, setTaskToDetail] = useState<Task>();
  // const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  // const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  const [permission, setPermission] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();
    console.log(taskDate);
    console.log();
  }

  useEffect(() => {
    const id = localStorage.getItem('@intranett:id');
    api
      .get(`/tasks/${id}`, {
        headers: {
          Authorization: id,
        },
      })
      .then(response => {
        setTasks(response.data);
      });
  }, []);

  return (
    <>
      {toggleCreateTaskModal && (
        <Modal page="form">
          <h1>Novo Usuário</h1>
          <form onSubmit={handleCreateTask}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              placeholder="Nome"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
            />
            <label htmlFor="startDate">Nome</label>
            <input
              id="startDate"
              type="datetime-local"
              placeholder="Data"
              onChange={e => setTaskDate(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
          <button type="button" onClick={() => setToggleCreateTaskModal(false)}>
            X
          </button>
        </Modal>
      )}
      {toggleTaskDetailsModal && (
        <Modal page="detailed-task">
          <h1>{`${taskToDetail?.name} - ${taskToDetail?.status}`}</h1>

          <p>
            <span>Início: </span>
            {taskToDetail?.start}
          </p>
          {taskToDetail?.status === 'cancelada' ? (
            <>
              <p>
                <span>Cancelada em: </span>
                {taskToDetail?.cancelled_at}
              </p>
              <p>
                <span>Motivo: </span>
                {taskToDetail?.cancellation_reason}
              </p>
            </>
          ) : (
            <p>
              <span>Término: </span>
              {taskToDetail?.status === 'Em andamento'
                ? taskToDetail.status
                : taskToDetail?.end}
            </p>
          )}
          <button
            type="button"
            onClick={() => setToggleTaskDetailsModal(false)}
          >
            Ok
          </button>
        </Modal>
      )}
      <Header />
      <Container>
        <Menu />
        <TasksContainer>
          <p>Tarefas</p>
          <table>
            <thead>
              <tr>
                <td>Tarefa</td>
                <td>Início</td>
                <td>Fim</td>
                <td>Status</td>
                <td>Ações</td>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr
                  key={task.id}
                  onClick={() => {
                    setToggleTaskDetailsModal(true);
                    setTaskToDetail(task);
                  }}
                >
                  <td>{task.name}</td>
                  <td>{task.start}</td>
                  <td>{task.end}</td>
                  <td>{task.status}</td>
                  <td>
                    <GiCancel style={{ color: 'red' }} />
                    <FaCheckCircle style={{ color: 'green' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setToggleCreateTaskModal(!toggleCreateTaskModal)}
            type="button"
          >
            Adicionar Tarefa
          </button>
        </TasksContainer>
      </Container>
    </>
  );
};

export default Tasks;
