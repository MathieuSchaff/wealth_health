import MyDatePicker1 from "./components/Datepicker/DatePicker";
import "./App.css";
import Form from "./components/Form/Form";
import { useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="App">
      <MyDatePicker1
        minDate={new Date(2018, 7, 22)}
        maxDate={new Date(2027, 2, 22)}
        primarycolor="teal"
        secondarycolor="blue"
        tertiarycolor="red"
        id="start-date"
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
      />
      {/* <Form /> */}
    </div>
  );
}

export default App;
