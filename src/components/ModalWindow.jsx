import React from 'react';
import PropTypes from 'prop-types';

function ModalWindow({ message, onClose }) {
      <div className="modal-background">
        <div className="modal-window">
        <br />
          <button type="button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWindow;
