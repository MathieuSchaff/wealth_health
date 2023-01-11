import { screen } from "@testing-library/react";

import DatePickerFns from "./DatePicker";
import { customRender } from "../../tests/testUtils";
import userEvent from "@testing-library/user-event";
import { format, setDate, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import React from "react";

const FORMAT_OF_DATE = "yyyy-MM-dd";
setDefaultOptions({ locale: fr });

const Higher = ({ date }: { date: Date }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(date);
  return (
    <DatePickerFns
      aria-label="date of birth of the user"
      id="dateOfBirth"
      value={selectedDate}
      onChange={setSelectedDate}
      minDate={new Date(2018, 7, 22)}
      maxDate={new Date(2027, 2, 22)}
      formatDate={FORMAT_OF_DATE}
      primarycolor="red"
      secondarycolor="purple"
      name={"birthDate"}
    />
  );
};

afterEach(() => {
  document.body.innerHTML = "";
});
describe("Date picker FNS test", () => {
  test("it sould render the Date picker", () => {
    customRender(<Higher date={new Date()} />);
    const datePickerTextInput = screen.getByRole("textbox");
    expect(datePickerTextInput).toBeInTheDocument();
  });
  test("it should render the calendar when click inside the input", async () => {
    const user = userEvent.setup();
    customRender(<Higher date={new Date(2023, 2, 1)} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);

    const buttonDayS = screen.getAllByRole("button", { name: /[0-9]{1,2}/i });
    expect(buttonDayS).toHaveLength(42);
  });
  test("it should render the buttons inside the header of the calendar to go in past or future of the current data", async () => {
    const user = userEvent.setup();
    customRender(<Higher date={new Date(2023, 2, 1)} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);
    const prevYearButton = screen.getByTestId("prev-year");
    const prevMonthButton = screen.getByTestId("prev-month");
    const nextMonthButton = screen.getByTestId("next-month");
    const nextYearButton = screen.getByTestId("next-year");
    expect(prevYearButton).toBeInTheDocument();
    expect(prevMonthButton).toBeInTheDocument();
    expect(nextMonthButton).toBeInTheDocument();
    expect(nextYearButton).toBeInTheDocument();
  });
  test("should render the two custom select inside the calendar", async () => {
    const user = userEvent.setup();
    const valueDate = new Date(2023, 2, 1);
    customRender(<Higher date={valueDate} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);
    const monthCustomSelect = screen.getByTestId("monthSelect");
    const yearCustomSelect = screen.getByTestId("yearSelect");
    expect(monthCustomSelect).toBeInTheDocument();
    expect(yearCustomSelect).toBeInTheDocument();
    expect(monthCustomSelect).toHaveTextContent(format(valueDate, "MMM"));
    expect(yearCustomSelect).toHaveTextContent(format(valueDate, "yyy"));
  });
  test("the custom select of the month should have 12 button inside", async () => {
    const user = userEvent.setup();
    const valueDate = new Date(2023, 2, 1);
    customRender(<Higher date={valueDate} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);
    const monthCustomSelect = screen.getByTestId("monthSelect");
    await user.click(monthCustomSelect);
    const monthBttons = screen.getAllByTestId("month-button");
    expect(monthBttons).toHaveLength(12);
  });
  test("the custom select of the year should have year max date minus year min date buttons", async () => {
    const user = userEvent.setup();
    // here we test the max date and min date as :
    // minDate={new Date(2018, 7, 22)}
    // maxDate={new Date(2027, 2, 22)}
    // 2027 - 2018 = 9
    const valueDate = new Date(2023, 2, 1);
    customRender(<Higher date={valueDate} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);
    const yearCustomSelect = screen.getByTestId("yearSelect");
    await user.click(yearCustomSelect);
    const monthBttons = screen.getAllByTestId("year-button");
    expect(monthBttons).toHaveLength(9);
  });
  test("should change the current year when clicking on a button inside the custom select year", async () => {
    const user = userEvent.setup();
    const valueDate = new Date(2023, 2, 1);
    customRender(<Higher date={valueDate} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);
    const yearCustomSelect = screen.getByTestId("yearSelect");
    await user.click(yearCustomSelect);
    const buttonYear2024 = screen.getByRole("button", { name: /2024/i });
    expect(buttonYear2024).toBeInTheDocument();
    await user.click(buttonYear2024);
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
  test("should change the current month when clicking on a button inside the custom select month", async () => {
    const user = userEvent.setup();
    const valueDate = new Date(2023, 2, 1);
    customRender(<Higher date={valueDate} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);
    const monthCustomSelect = screen.getByTestId("monthSelect");
    await user.click(monthCustomSelect);
    const monthBttons = screen.getAllByTestId("month-button");
    await user.click(monthBttons[0]);
    const buttonMonthFirstMonth = screen.getByText(/JANV/i);
    expect(buttonMonthFirstMonth).toBeInTheDocument();
  });
  test("should change the input text when clicking on a button day in the calendar", async () => {
    const user = userEvent.setup();
    const valueDate = new Date(2023, 1, 1);
    customRender(<Higher date={valueDate} />);
    const datePickerTextInput = screen.getByRole("textbox");
    await user.click(datePickerTextInput);
    const buttonDay20 = screen.getByRole("button", { name: /20/i });
    expect(buttonDay20).toBeInTheDocument();
    await user.click(buttonDay20);
    // as the format is "yyyy-MM-dd"
    const changeDayInDate = setDate(valueDate, 20);
    expect(datePickerTextInput).toHaveValue(
      format(changeDayInDate, FORMAT_OF_DATE)
    );
  });
});
