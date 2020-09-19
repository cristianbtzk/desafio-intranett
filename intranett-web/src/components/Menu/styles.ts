import styled from 'styled-components';

export const MenuContainer = styled.div`
  width: 100px;
  background: #2f4c5c;
  height: 100vh;

  a {
    display: block;
    color: #dbdbdb;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    transition: background 0.1s;
    svg {
      margin-bottom: 3px;
    }
    &:hover {
      background: #182b36;
    }
  }
`;
