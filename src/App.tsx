import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ZofForm from "./components/ZodForm.tsx/ZodForm";
import UsersTable from "./pages/UsersTable";
// let db = null;
// let objectstore = null;
// let DBOpenReq = indexedDB.open("whiskydb", 1);
// DBOpenReq.addEventListener("error", (err) => {
//   console.warn(err);
// });
// DBOpenReq.addEventListener("success", (ev) => {
//   db = ev.target.result;
//   console.log("success", db);
// });
// DBOpenReq.addEventListener("upgradeneeded", (ev) => {
//   db = ev.target.result;
//   console.log("upgrade", db);
//   objectstore = db.createObjectStore("whiskeyStore", { keyPath: "id" });
// });
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ZofForm />} />
        <Route path="users" element={<UsersTable />} />
      </Routes>
      <Link to="/">Go to form</Link>
      <Link to="/users">Go to users</Link>
    </div>
  );
}

export default App;
