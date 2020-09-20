import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const UsersContainer = styled.div`
  padding: 10px 15px;
  width: 100%;
  > p {
    display: block;
    font-size: 28px;
    padding: 8px;
    background: #dadfe3;
    border: 1px solid #b8bcbf;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #000;
    border: 1px solid #c0c3c4;
    thead tr td {
      background: #74797d;
      color: #fff;
    }

    tr:nth-child(odd) {
      background: #fafdff;
    }

    tr:nth-child(even) {
      background: #e3e6e8;
    }

    td {
      height: 50px;
      text-align: center;
      font-size: 20px;
      text-align: start;
      padding: 0px 15px;
    }
  }

  button {
    width: 200px;
    height: 60px;
    background: #418cb5;
    border-radius: 10px;
    border: 0;
    color: #fff;
    font-size: 18px;
    margin-top: 28px;
    transition: background 0.3s;

    &:hover {
      background: #2f7296;
    }
  }
`;
