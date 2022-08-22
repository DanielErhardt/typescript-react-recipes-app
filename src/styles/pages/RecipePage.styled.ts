import styled from 'styled-components';

const RecipePage = styled.main`
  padding: 5px;
  gap: 10px;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  section.header > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section.header img {
    width: 100%;
    border-radius: 10px;
  }

  section .recipe-name-bar {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  section > div {
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    width: 100%;
  }

  section > div.padded {
    padding: 10px;
  }

  button {
    font-size: 20px;
    font-weight: 600;
    border-radius: 10px;
    min-height: 40px;
    width: 100%;
  }
`;

export default RecipePage;
