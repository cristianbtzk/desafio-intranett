import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { useRouteMatch } from 'react-router-dom';
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

interface TaskParams {
  user_id: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { params } = useRouteMatch<TaskParams>();

  const [toggleTaskDetailsModal, setToggleTaskDetailsModal] = useState(false);
  const [taskToDetail, setTaskToDetail] = useState<Task>();

  function formatDate(date: Date | null) {
    if (!date) return null;
    return format(
      zonedTimeToUtc(date, 'America/Sao_Paulo'),
      "dd/MM/yyyy 'as' HH:mm",
    );
  }

  useEffect(() => {
    try {
      const id = localStorage.getItem('@intranett:id');
      api
        .get(`/teamtasks/${params.user_id}`, {
          headers: {
            Authorization: id,
          },
        })
        .then(response => {
          setTasks(response.data);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  }, [params.user_id]);

  return (
    <>
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
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr
                  key={task.id}
                  onClick={e => {
                    setToggleTaskDetailsModal(true);
                    setTaskToDetail(task);
                  }}
                >
                  <td>{task.name}</td>
                  <td>{formatDate(task.start)}</td>
                  <td>{formatDate(task.end)}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TasksContainer>
      </Container>
    </>
  );
};

export default Tasks;
