import React, { useState, useEffect } from 'react';
import { GiCancel } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { Container, TasksContainer } from './styles';
import api from '../../services/api';

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
        console.log(response.data);
        console.log(tasks);
      });
  }, []);

  return (
    <>
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
                <tr key={task.id}>
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
        </TasksContainer>
      </Container>
    </>
  );
};

export default Tasks;
