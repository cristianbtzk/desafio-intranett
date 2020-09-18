import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;
  background: #fafbfc;
  border: 2px solid #a7a7a8;
  max-height: 650px;
  max-width: 600px;
  padding: 25px;

  h1 {
    text-align: center;
    font-size: 40px;
  }

  form {
    > label {
      margin-top: 30px;
    }
    label {
      display: block;
      font-size: 24px;
    }

    input + label {
      margin-top: 25px;
    }

    input {
      margin-top: 8px;
      font-size: 18px;
      border: 1px solid #c9cdd4;
      padding: 8px 4px;
      width: 100%;

      &::placeholder {
        color: #c9cdd4;
      }
    }

    button {
      width: 100%;
      height: 60px;
      background: #418cb5;
      border: 0;
      color: #fff;
      font-size: 18px;
      margin-top: 28px;
      transition: background 0.3s;

      &:hover {
        background: #2f7296;
      }
    }
  }

  a {
    display: block;
    margin-top: 24px;
    color: #418cb5;
    display: flex;
    font-size: 18px;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;
