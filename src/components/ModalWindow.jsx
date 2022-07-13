import React from 'react';

function ModalWindow() {
  const closeWindow = () => {
    const window = document.querySelector('.modal-window');
    window.classList.add('closed');
  };

  return (
    <div className="modal-window closed">
      <div className="modal-box">
        <h4>Message</h4>
        <br />
        <button type="button" onClick={closeWindow}>OK</button>
      </div>
    </div>
  );
}

export default ModalWindow;
