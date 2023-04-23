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
    font-family: 'Montserrat', sans-serif;
  }

  html,
  body {
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    background: var(--background-color);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
