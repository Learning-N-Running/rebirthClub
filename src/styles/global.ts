"use client";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    body {
    font-family: 'ABeeZee'
    }

  // Acme
  @font-face {
    font-family: 'Acme';
    src: local('AcmeRegular');
    font-style: normal;
    src: url('/static/Acme/Acme-Regular.ttf') format('truetype');
  }

    // ABeeZee
    @font-face {
    font-family: 'ABeeZee';
    src: local('ABeeZeeRegular');
    font-style: normal;
    src: url('/static/ABeeZee/ABeeZee-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'ABeeZee';
    src: local('ABeeZeeItalic');
    font-style: italic;
    src: url('/static/ABeeZee/ABeeZee-Italic.ttf') format('truetype');
  }

  // AnekDevanagari
  @font-face {
    font-family: 'AnekDevanagari';
    src: local('AnekDevanagariRegular');
    font-style: normal;
    src: url('/static/AnekDevanagari/AnekDevanagari-Regular.ttf') format('truetype');
  }

`;

export default GlobalStyle;
