import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
html {
  box-sizing: border-box;
  font-size: 50%;  // 1rem = 8px; 8/16 = 50%
  @media (min-width: 768px) {
    // width 768px  ?
    font-size: 56.25%; // 1rem = 9px; 9/16 = 56.25%
  }
  @media (min-width: 1200px) {
    font-size: 62.5%; // 1rem = 10px; 8/16 = 62.5%
  }
  @media (min-width: 1800px) {
    // width > 1800 ?
    font-size: 75%; // 1rem = 12px; 12/16 = 75%
  }
}
body {
  font-family: Oswald, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${(props) => props.theme.colors.fontColor};
  border: 2px solid ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.backgroundLight};
  min-height: 100vh;
  margin: 0;
  font-size: 2rem;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  line-height: calc(1em + 0.5rem);
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

ol,
ul {
  list-style: none;
}
li {
  list-style-type: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
input,
button,
textarea,
select {
  font: inherit;
  font-size: 1rem;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

`;
