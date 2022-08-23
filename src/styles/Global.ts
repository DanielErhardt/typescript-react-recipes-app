import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
  min-height: 100%;
}

#root {
  display: flex;
  flex-direction: column;
}

header, main, footer {
  background-color: rgb(255, 198, 198);
}

header, footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  flex: auto;
}
`;

export default GlobalStyles;
