import { createGlobalStyle } from "styled-components";
import "normalize.css";

export const Sizes = {
  tablet: 740,
  desktop: 769,
  widescreen: 1440,
};

export const GlobalStyle = createGlobalStyle`
  :root {    
    --color-background: #ffffff;
    --color-background-modal: rgba(19, 24, 32, 0.56);
    --color-background-body: #FBFBFD;
    --color-text: #3E3F42;
    --color-text-muted: #9EA0A5;
    --color-text-inverted: #FFFFFF;
    --color-border: #D5D5D5;
    --color-tint: #3F4FA5;
    --color-button-primary: #3F4FA5;
    --color-mention-entity: rgba(253, 101, 146, 0.15);
    --color-mention-user: rgba(84, 104, 210, 0.18);
    --color-selection: #E0E4F7;
    --color-textfield: #f3f3f3;

    --weight-medium: 600;

    --shadow-border-bottom: 0 1px 0 0 var(--color-border);
    --shadow-border-left: -1px 0 0 0 var(--color-border);
    --shadow-box: 0px 2px 4px rgba(0, 0, 0, 0.17);

    --size-sidebar: 285px;
    --size-header: 70px;
    --size-modal: 540px;

    --tablet: ${Sizes.tablet}px;
    --desktop: ${Sizes.desktop}px;
    --widescreen: ${Sizes.widescreen}px;

    --z-menu: 90;
    --z-context: 95;
    --z-modal: 100;
    --z-notifications: 110;

    @media (prefers-color-scheme: dark) {
      --color-background: #222226;
      --color-background-modal: rgba(19, 24, 32, 0.56);
      --color-background-body: #1C1C1F;
      --color-text: #FFFFFF;
      --color-text-muted: #9EA0A5;
      --color-text-inverted: #FFFFFF;
      --color-border: #2B2B30;
      --color-button-secondary: #1C1C1F;
      --color-textfield: #383838;
    }
  }

  * {
    box-sizing: border-box;
  }

  input, select {
    appearance: none;
    font-size: 1em;
    background-color: transparent;
    color: inherit;
    border: none;
    outline: none;
    border-radius: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font-family: "Open Sans", Helvetica, sans-serif;
    font-size: 14px;
    color: var(--color-text);
    background-color: var(--color-background-body);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
`;
