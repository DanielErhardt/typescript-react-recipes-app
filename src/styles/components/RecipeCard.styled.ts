import styled from 'styled-components';

const RecipeCard = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  background-color: rgba(255,255,255,0.5); 
  min-width: 48%;
  width: calc(50% - 3px);
  border-radius: 15px;
  text-align: center;
  color: black;
  padding-bottom: 3px;

  img {
    width: 100%;
    border-radius: 15px 15px 0 0;
  }

  p {
    font-size: 14px;
  }
`;

export default RecipeCard;
