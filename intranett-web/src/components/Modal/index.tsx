import React from 'react';

import { ModalContainer } from './styles';

interface ModalProps {
  page: string;
}

const Modal: React.FC<ModalProps> = ({ page, children }) => {
  return <ModalContainer page={page}>{children}</ModalContainer>;
};

export default Modal;
