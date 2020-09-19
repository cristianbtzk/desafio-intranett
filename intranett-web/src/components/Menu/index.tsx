import React from 'react';
import { Link } from 'react-router-dom';
import { RiTeamLine, RiUserLine } from 'react-icons/ri';
import { GoTasklist } from 'react-icons/go';
import { MenuContainer } from './styles';

const Menu: React.FC = () => {
  return (
    <MenuContainer>
      <Link to="/">
        <RiUserLine />
        Usuários
      </Link>
      <Link to="/">
        <RiTeamLine />
        Equipes
      </Link>
      <Link to="/">
        <GoTasklist />
        Tarefas
      </Link>
    </MenuContainer>
  );
};

export default Menu;
