import MyDatePicker1 from "./components/Datepicker/DatePicker";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MyDatePicker1
        minDate={new Date(2022, 7, 22)}
        maxDate={new Date(2023, 2, 22)}
      />
    </div>
  );
}

export default App;
