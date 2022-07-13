export const createId = (length = 8) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const defaultIconConfig = {
  weight: 'bold',
  size: '24px',
  color: 'black',
};

export const openModalWindow = (message) => {
  const window = document.querySelector('.modal-window');
  const messageElement = document.querySelector('.modal-box h4');
  messageElement.innerText = message;
  window.classList.remove('closed');
};
