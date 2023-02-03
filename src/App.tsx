import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import styled from "styled-components";
import { GlobalStyle } from "./utils/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/theme";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Spinner/Spinner";
const LazyUsers = lazy(() => import("./pages/Users/Users"));
const SApp = styled.div`
  max-width: 100vw;
  overflow: hidden;
  padding: 1.5rem;
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SApp className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="users"
            element={
              <Suspense fallback={<Spinner />}>
                <LazyUsers />
              </Suspense>
            }
          />
        </Routes>
      </SApp>
    </ThemeProvider>
  );
}

export default App;
