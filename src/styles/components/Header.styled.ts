import styled from 'styled-components';

const Header = styled.header`
  button {
    padding: 0 2px;
  }

  & > h1 {
    margin: 10px 0 0 3px;
  }

  & > div {
    display: flex;
    justify-content: space-evenly;
    width: 90%;
    margin: 5px;
  }
`;

const SearchButton = styled.button`
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 2vh;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(252, 161, 161);
  height: 40px;
  width: 80%;
  border-radius: 2vh;
  margin: 5px;

  input {
    text-align: center;
    height: 30px;
    width: 80%;
    border-radius:2vh;
  }
`;

export {
  Header,
  SearchButton,
  SearchBar,
};
