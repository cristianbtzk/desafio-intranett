import React, { useState, useEffect, FormEvent } from 'react';
import { GiCancel } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
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
  const [taskToCancel, setTaskToCancel] = useState<Task>();
  const [taskToFinish, setTaskToFinish] = useState<Task>();
  const [toggleCancelTaskModal, setToggleCancelTaskModal] = useState(false);
  const [toggleFinishTaskModal, setToggleFinishTaskModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [taskCancellationReason, setTaskCancellationReason] = useState('');

  function formatDate(date: Date | null) {
    if (!date) return null;
    return format(
      zonedTimeToUtc(date, 'America/Sao_Paulo'),
      "dd/MM/yyyy 'as' HH:mm",
    );
  }

  async function handleCreateTask(e: FormEvent) {
    e.preventDefault();
    const start = new Date(taskDate).toISOString().toString();
    const id = localStorage.getItem('@intranett:id');
    try {
      const response = await api.post(
        '/tasks',
        {
          start,
          name: taskName,
          responsible_id: id,
        },
        {
          headers: {
            Authorization: id,
          },
        },
      );
      setToggleCancelTaskModal(false);
      setTasks([...tasks, response.data]);
      alert('Tarefa Cadastrada.');
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  async function handleCancelTask(e: FormEvent) {
    e.preventDefault();
    const cancelled_at = new Date().toISOString().toString();
    const id = localStorage.getItem('@intranett:id');
    try {
      await api.put(
        '/tasks',
        {
          cancelled_at,
          cancellation_reason: taskCancellationReason,
          task_id: taskToCancel?.id,
        },
        {
          headers: {
            Authorization: id,
          },
        },
      );
      setToggleCancelTaskModal(false);
      alert('Tarefa cancelada.');
    } catch (err) {
      alert(err.response.data);
    }
  }

  async function handleFinishTask(e: FormEvent) {
    e.preventDefault();
    const id = localStorage.getItem('@intranett:id');
    const end = new Date(finishDate).toISOString();
    try {
      await api.patch(
        '/tasks',
        {
          end,
          task_id: taskToFinish?.id,
        },
        {
          headers: {
            Authorization: id,
          },
        },
      );
      setToggleFinishTaskModal(false);
      alert('Tarefa Finalizada.');
    } catch (err) {
      alert(err.response.data);
    }
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
          <h1>Nova Tarefa</h1>
          <form onSubmit={handleCreateTask}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              placeholder="Nome"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
            />
            <label htmlFor="startDate">Início</label>
            <input
              id="startDate"
              type="datetime-local"
              placeholder="Data"
              onChange={e => setTaskDate(e.target.value)}
            />
            <div>
              <button
                type="button"
                onClick={() => setToggleCreateTaskModal(false)}
              >
                Cancelar
              </button>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </Modal>
      )}
      {toggleTaskDetailsModal && (
        <Modal page="detailed-task">
          <h1>{`${taskToDetail?.name} - ${taskToDetail?.status}`}</h1>

          <p>
            <span>Início: </span>
            {taskToDetail?.start && formatDate(taskToDetail.start)}
          </p>
          {taskToDetail?.status === 'Cancelada' ? (
            <>
              <p>
                <span>Cancelada em: </span>
                {taskToDetail?.cancelled_at &&
                  formatDate(taskToDetail.cancelled_at)}
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
                : taskToDetail?.end && formatDate(taskToDetail.end)}
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

      {toggleCancelTaskModal && (
        <Modal page="form">
          <h1>Cancelar {taskToCancel?.name}</h1>
          <p>
            <span>Início: </span>{' '}
            {taskToCancel?.start && formatDate(taskToCancel.start)}{' '}
          </p>
          <form onSubmit={handleCancelTask}>
            <label htmlFor="reason">Motivo</label>
            <input
              id="reason"
              placeholder="Motivo do Cancelamento"
              value={taskCancellationReason}
              onChange={e => setTaskCancellationReason(e.target.value)}
            />
            <div>
              <button
                type="button"
                onClick={() => setToggleCancelTaskModal(false)}
              >
                Cancelar
              </button>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </Modal>
      )}

      {toggleFinishTaskModal && (
        <Modal page="form">
          <h1>Finalizar {taskToFinish?.name}</h1>
          <p>
            <span>Início: </span>{' '}
            {taskToFinish?.start && formatDate(taskToFinish.start)}
          </p>
          <form onSubmit={handleFinishTask}>
            <label htmlFor="finishDate">Término</label>
            <input
              id="finishDate"
              type="datetime-local"
              placeholder="Data final"
              value={finishDate}
              onChange={e => setFinishDate(e.target.value)}
            />
            <div>
              <button
                type="button"
                onClick={() => setToggleFinishTaskModal(false)}
              >
                Cancelar
              </button>
              <button type="submit">Enviar</button>
            </div>
          </form>
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
                  onClick={e => {
                    if (e.target instanceof HTMLElement) {
                      setToggleTaskDetailsModal(true);
                      setTaskToDetail(task);
                    }
                  }}
                >
                  <td>{task.name}</td>
                  <td>{formatDate(task.start)}</td>
                  <td>{formatDate(task.end)}</td>
                  <td>{task.status}</td>
                  <td>
                    {task.status === 'Em andamento' ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setToggleCancelTaskModal(true);
                            setTaskToCancel(task);
                          }}
                        >
                          <GiCancel style={{ color: 'red' }} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToggleFinishTaskModal(true);
                            setTaskToFinish(task);
                          }}
                        >
                          <FaCheckCircle style={{ color: 'green' }} />
                        </button>
                      </>
                    ) : null}
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
