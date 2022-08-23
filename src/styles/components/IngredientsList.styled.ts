import styled from 'styled-components';

type ListProps = {
  marginLeft: string;
  listStyle: string;
};

const IngredientsList = styled.ul<ListProps>`
  margin-left: ${({ marginLeft }) => marginLeft};
  list-style: ${({ listStyle }) => listStyle};


  li input {
    margin-right: 3px;
  }
`;

export default IngredientsList;
