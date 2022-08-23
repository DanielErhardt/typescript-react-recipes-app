import styled from 'styled-components';

const ModalWindow = styled.div`
  .background {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    width: 100%;
    height: 100%;
  } 

  .foreground {
    background-color: white;
    text-align: center;
    width: 75%;
    padding: 20px;
    border-radius: 15px;
    z-index: 2;
  }  

  button {
    width: 50px;
  }
`;

export default ModalWindow;
