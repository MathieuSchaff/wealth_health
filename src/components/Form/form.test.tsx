import { fireEvent, render, screen } from "@testing-library/react";
import Form, { FORMAT_OF_DATE, FormSchema } from "./Form";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import { object, string } from "zod";
import { format } from "date-fns";
import { customRender } from "../../tests/testUtils";
describe("Form to add a user", () => {
  test.skip("render the form", async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    customRender(<Form onsubmit={handleSubmit} />);
    const form = screen.getByRole("form") as HTMLFormElement;

    const inputLastName = screen.getByRole("textbox", { name: /last name/i });
    const inputFirstName = screen.getByRole("textbox", { name: /First Name/i });
    const inputDateOfBirth = screen.getByRole("textbox", {
      name: /Date of birth/i,
    });

    const inputStartDate = screen.getByRole("textbox", { name: /Start Date/i });
    const inputStreet = screen.getByRole("textbox", { name: /Street/i });
    const inputCity = screen.getByRole("textbox", { name: /City/i });
    const inputZipCode = screen.getByRole("spinbutton", { name: /zip code/i });
    const inputDepartment = screen.getByLabelText(/department/i);
    const inputState = screen.getByLabelText(/State/i);
    const submittedButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    expect(form).toBeInTheDocument();
    expect(inputLastName).toBeInTheDocument();
    expect(inputFirstName).toBeInTheDocument();
    expect(inputDateOfBirth).toBeInTheDocument();
    expect(inputStartDate).toBeInTheDocument();
    expect(inputStreet).toBeInTheDocument();
    expect(inputCity).toBeInTheDocument();
    expect(inputZipCode).toBeInTheDocument();
    expect(inputState).toBeInTheDocument();
    expect(inputDepartment).toBeInTheDocument();
    expect(submittedButton).toBeInTheDocument();

    expect(form).toHaveFormValues({
      firstName: "",
      lastName: "",
      dateOfBirth: format(new Date(), FORMAT_OF_DATE),
      startDate: format(new Date(), FORMAT_OF_DATE),
      street: "",
      city: "",
      state: "",
      zipCode: null,
      department: "",
    });
    await user.type(inputLastName, "john");
    await user.type(inputFirstName, "john");
    await user.type(inputDateOfBirth, "john");
    await user.type(inputStartDate, "john");
    await user.type(inputStreet, "john");
    await user.type(inputCity, "john");
    await user.type(inputZipCode, "3");
    await user.type(inputState, "john");
    await user.type(inputDepartment, "john");
    expect(form).toHaveFormValues({
      firstName: "john",
      lastName: "john",
      dateOfBirth: "john",
      startDate: "john",
      street: "john",
      city: "john",
      state: "john",
      zipCode: "3",
      department: "john",
    });
    await user.click(submittedButton);

    expect(handleSubmit).toHaveBeenCalled();

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
