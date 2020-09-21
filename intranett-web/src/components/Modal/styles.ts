import styled, { css } from 'styled-components';

interface ContainerProps {
  page: string;
}

export const ModalContainer = styled.div<ContainerProps>`
  background: #fafafa;
  box-shadow: 0px 0px 10px 1px rgba(173, 173, 173, 1);
  width: 40%;
  padding: 20px 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${props => {
    switch (props.page) {
      case 'form': {
        return css`
          > p {
            margin-top: 20px;
            font-size: 18px;
            span {
              font-weight: bold;
            }
          }
          form {
            > label {
              margin-top: 30px;
            }
            label {
              display: block;
              font-size: 17px;
            }

            input + label {
              margin-top: 25px;
            }

            input {
              margin-top: 8px;
              font-size: 16px;
              border: 0;
              border-bottom: 1px solid #b5b5b5;
              background: transparent;
              padding: 8px 4px;
              width: 100%;

              &::placeholder {
                color: #c9cdd4;
              }
            }
            div {
              display: flex;
              justify-content: flex-end;

              button {
                height: 50px;
                min-width: 100px;
                box-shadow: 0px 0px 10px 1px rgba(173, 173, 173, 1);
                background: #fff;
                border: 0;
                color: #000;
                font-size: 18px;
                margin-top: 28px;
                margin-right: 20px;
              }

              button + button {
                height: 50px;
                background: #418cb5;
                min-width: 100px;
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

            select {
              display: block;
              margin-top: 15px;
              padding: 5px;
              font-size: 18px;
            }
          }
        `;
      }
      case 'detailed-task': {
        return css`
          display: flex;
          flex-direction: column;
          p span {
            font-weight: bold;
            margin-right: 3px;
          }

          p {
            margin-top: 25px;
          }
          h1 + p {
            margin-top: 30px;
          }

          button {
            margin-top: 130px;
            padding: 10px;
            background: #fff;
            border: 0;
            min-width: 80px;
            box-shadow: 0px 0px 5px 1px rgba(173, 173, 173, 1);
            font-size: 20px;
            align-self: flex-end;
          }
        `;
      }

      default: {
        return null;
      }
    }
  }};
`;
