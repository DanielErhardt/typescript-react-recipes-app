import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  message: string[],
  onClose: () => void,
}

const portal = document.getElementById('portal') as HTMLElement;

function ModalWindow({ message, onClose }: Props) {
  return createPortal(
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {message.length > 0 && (
      <div className="modal-background">
        <div className="modal-window">
          <h4>{message}</h4>
          <br />
          <button type="button" onClick={onClose}>OK</button>
        </div>
      </div>
      )}
    </>,
    portal,
  );
}

export default ModalWindow;
