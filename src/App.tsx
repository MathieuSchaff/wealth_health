import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ZofForm from "./components/ZodForm.tsx/ZodForm";
import UsersTable from "./pages/UsersTable";

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
