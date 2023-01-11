import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import { BrowserRouter } from "react-router-dom";

export function WrapperProviders({ children }: { children: JSX.Element }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </BrowserRouter>
  );
}

export function customRender(ui: JSX.Element) {
  rtlRender(ui, { wrapper: WrapperProviders });
}
export function WrapperDatePicker({ children }: { children: JSX.Element }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </BrowserRouter>
  );
}
