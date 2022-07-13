import React from 'react';
import PropTypes from 'prop-types';

function ModalWindow({ message, onClose }) {
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
