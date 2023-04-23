import { createGlobalStyle } from 'styled-components';

export const styles = createGlobalStyle`
  :root {
    --background-color: #0B0D0F;
    --text-color: #FFFFFF;

  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    background: var(--background-color);
    font-family: 'Montserrat', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
