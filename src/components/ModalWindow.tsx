import React from 'react';
import { createPortal } from 'react-dom';
import StyleWrapper from '../styles/components/ModalWindow.styled';

interface Props {
  message: string[],
  onClose: () => void,
}

const portal = document.getElementById('portal') as HTMLElement;

function ModalWindow({ message, onClose }: Props) {
  return createPortal(
    <StyleWrapper>
      {message.length > 0 && (
      <div className="background">
        <div className="foreground">
          <h4>{message}</h4>
          <br />
          <button type="button" onClick={onClose}>OK</button>
        </div>
      </div>
      )}
    </StyleWrapper>,
    portal,
  );
}

export default ModalWindow;
