import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const TasksContainer = styled.div`
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

    tr td:nth-child(5) {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-evenly;
    }

    td {
      height: 50px;
      text-align: center;
      font-size: 24px;
    }

    td button {
      border: 0;
      background: transparent;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
