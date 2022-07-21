import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function ModalWindow({ message, onClose }) {
  return ReactDOM.createPortal(
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
    document.getElementById('portal'),
  );
}

ModalWindow.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWindow;
