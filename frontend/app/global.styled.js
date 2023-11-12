"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsl(0, 0%, 90%);
    margin-inline: 2rem;
  }
`;

export default GlobalStyles;
