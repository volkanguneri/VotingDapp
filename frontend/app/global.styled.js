"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
    border: none;
    outline:0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsl(0, 0%, 90%);
    margin-inline: 0rem;

    // font-family: "Georgia";
    font-family: "Garamond", serif;

  }
`;

export default GlobalStyles;
