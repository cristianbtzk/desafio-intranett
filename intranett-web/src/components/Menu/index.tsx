import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiTeamLine, RiUserLine } from 'react-icons/ri';
import { GoTasklist } from 'react-icons/go';
import { MenuContainer } from './styles';

const Menu: React.FC = () => {
  const [permission, setPermission] = useState<string | null>();

  useEffect(() => {
    const userPermission = localStorage.getItem('@intranett:permission');
    setPermission(userPermission);
  }, []);

  return (
    <MenuContainer>
      {permission !== 'Colaborador' ? (
        <Link to="/users">
          <RiUserLine />
          Usuários
        </Link>
      ) : null}

      <Link to="/">
        <RiTeamLine />
        Equipes
      </Link>
      <Link to="/tasks">
        <GoTasklist />
        Tarefas
      </Link>
    </MenuContainer>
  );
};

export default Menu;
