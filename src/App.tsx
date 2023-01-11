import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import styled from "styled-components";
import { GlobalStyle } from "./utils/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/theme";
import React from "react";
// if (!("indexedDB" in window)) {
//   console.log("This browser doesn't support IndexedDB");
// }
// export let db: IDBDatabase | null = null;
// let objectStore = null;
// let DBOpenReq = indexedDB.open("UsersDB", 2);

// DBOpenReq.addEventListener("error", (err) => {
//   //Error occurred while trying to open DB
//   console.warn(err);
// });
// DBOpenReq.addEventListener("success", (ev) => {
//   //DB has been opened... after upgradeneeded
//   db = ev.target.result;
//   console.log("success", db);
// });
// DBOpenReq.addEventListener("upgradeneeded", (ev) => {
//   //first time opening this DB
//   //OR a new version was passed into open()
//   let db = DBOpenReq.result;
//   let oldVersion = ev.oldVersion;
//   let newVersion = ev.newVersion || db.version;
//   console.log("DB updated from version", oldVersion, "to", newVersion);

//   console.log("upgrade", db);
//   if (!db.objectStoreNames.contains("usersStore")) {
//     objectStore = db.createObjectStore("whiskeyStore", {
//       keyPath: "id",
//     });
//   }
// });

const SApp = styled.div`
  max-width: 100vw;
  overflow: hidden;
  padding: 1.5rem;
  min-height: 100vh;
`;
export interface IArrowHeaderAria {
  prevYear: string;
  prevMonth: string;
  nextMonth: string;
  nextYear: string;
  customSelectMonth: string;
  customSelectYear: string;
}
export type AriaLabels = {
  input: string;
  ariaArrow: IArrowHeaderAria;
};

const ariaLabels = {
  input: "date of birth of the user",
  ariaArrow: {
    prevYear: "go to previous year",
    prevMonth: "go to previous month",
    nextMonth: "go to next month",
    nextYear: "go to next year",
    customSelectMonth: "select another month",
    customSelectYear: "select another year",
  },
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SApp className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </SApp>
    </ThemeProvider>
  );
}

export default App;
