import styled from 'styled-components';

const SidewaysMenu = styled.nav`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  padding: 5px;
  gap: 3px;

  button {
    padding: 4px 6px;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
`;

export default SidewaysMenu;
