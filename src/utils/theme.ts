import "styled-components";
// F39237
// D4B483
export const theme = {
  colors: {
    primary: "#54a0ff",
    indianRed: "#DB5461",
    secondary: "#2e86de",
    dimGray: "#686963",
    backgroundLight: "#c8d6e5",
    white: "#EBF5EE",
    errorColor: "#F5F749",
    fontColor: "#332C23",
  },
  fontSize: {
    body: "2rem",
    input: "1.8rem",
  },
  table: {
    borderRadius: "8px",
    mdSpacing: "1.8rem",
    arrowPadding: "1.5rem",
    smSpacing: "8px",
    lgSpacing: "32px",
    sm: "37.5em",
    md: "48em",
    lg: "64em",
  },
};
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      indianRed: string;
      dimGray: string;

      backgroundLight: string;
      white: string;
      errorColor: string;
      fontColor: string;
    };
    fontSize: {
      body: string;
      input: string;
    };
    table: {
      borderRadius: string;
      mdSpacing: string;
      smSpacing: string;
      arrowPadding: string;
      lgSpacing: string;
      sm: string;
      md: string;
      lg: string;
    };
  }
}
