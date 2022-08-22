import styled from 'styled-components';

const LabeledInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    margin: 0 3px;
  }
`;

export default LabeledInput;
