import Select from "react-select";
import { useZorm } from "react-zorm";
import {
  ButtonSubmit,
  InputForm,
  LabelForm,
  FormStyled,
  FieldSetForm,
  FormContainer,
  TitleForm,
  LegendFormAdress,
} from "../Form/styledForm";
import { z } from "zod";
import { useState } from "react";
import DatePickerFns from "../DataPickerFns/DatePickerFns";
import { useUsersStore } from "../../zustandStore";
const options = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Legal", label: "Legal" },
];
function ErrorMessage(props: { message: string }) {
  return <div className="error-message">{props.message}</div>;
}

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),

  dateOfBirth: z.preprocess(
    (arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    },
    z
      .date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      })
      .min(new Date(2018, 7, 22), { message: "Too old" })
      .max(new Date(2027, 2, 22), { message: "Too young!" })
  ),
  startDate: z.preprocess(
    (arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
  ),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z

    .string()
    .regex(/^[0-9]+$/)
    .transform(Number),
  department: z.string().min(1),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FormSchema = z.infer<typeof FormSchema>;
const Form = () => {
  const addOneUser = useUsersStore((state) => state.addOneUser);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const zo = useZorm("signup", FormSchema, {
    onValidSubmit(e) {
      e.preventDefault();
      console.log(e.data);
      addOneUser(e.data);
    },
  });

  return (
    <FormContainer className="form-container">
      <a href="employee-list.html">View Current Employees</a>
      <TitleForm>Create Employee</TitleForm>
      <FormStyled action="#" ref={zo.ref}>
        <LabelForm htmlFor="firstName">First Name</LabelForm>
        <InputForm type="text" name={zo.fields.firstName()} />
        {zo.errors.firstName((e) => (
          <ErrorMessage message={e.message} />
        ))}
        <LabelForm htmlFor="lastName">Last Name</LabelForm>
        <InputForm type="text" name={zo.fields.lastName()} />
        {zo.errors.lastName((e) => (
          <ErrorMessage message={e.message} />
        ))}
        <LabelForm htmlFor="dateOfBirth">Date of birth</LabelForm>
        <DatePickerFns
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date(2018, 7, 22)}
          maxDate={new Date(2027, 2, 22)}
          isoFormat="yyyy-MM-dd"
          primarycolor="red"
          secondarycolor="purple"
          name={zo.fields.dateOfBirth()}
        />
        {zo.errors.dateOfBirth((e) => (
          <ErrorMessage message={e.message} />
        ))}
        <LabelForm htmlFor="startDate">Start Date</LabelForm>
        <DatePickerFns
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date(2018, 7, 22)}
          maxDate={new Date(2027, 2, 22)}
          isoFormat="yyyy-MM-dd"
          primarycolor="red"
          secondarycolor="purple"
          name={zo.fields.startDate()}
        />
        {zo.errors.startDate((e) => (
          <ErrorMessage message={e.message} />
        ))}
        <FieldSetForm className="address">
          <LegendFormAdress>Address</LegendFormAdress>

          <LabelForm htmlFor="street">Street</LabelForm>
          <InputForm name={zo.fields.street()} type="text" />
          {zo.errors.street((e) => (
            <ErrorMessage message={e.message} />
          ))}
          <LabelForm htmlFor="city">City</LabelForm>
          <InputForm name={zo.fields.city()} type="text" />
          {zo.errors.city((e) => (
            <ErrorMessage message={e.message} />
          ))}
          <LabelForm htmlFor="state">State</LabelForm>
          <Select
            name={zo.fields.state()}
            options={options}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                maxWidth: "200px",
                width: "325px",
                borderColor: state.isFocused ? "grey" : "#3498db",
              }),
            }}
          />
          {zo.errors.state((e) => (
            <ErrorMessage message={e.message} />
          ))}

          <LabelForm htmlFor="zipCode">Zip Code</LabelForm>
          <InputForm id="zipCode" name={zo.fields.zipCode()} type="number" />
          {zo.errors.state((e) => (
            <ErrorMessage message={e.message} />
          ))}
          <LabelForm htmlFor="department">Department</LabelForm>
          <Select
            name={zo.fields.department()}
            options={options}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                maxWidth: "200px",
                width: "325px",
                borderColor: state.isFocused ? "grey" : "#3498db",
              }),
            }}
          />
          {zo.errors.department((e) => (
            <ErrorMessage message={e.message} />
          ))}
        </FieldSetForm>

        <ButtonSubmit type="submit">Submit</ButtonSubmit>
      </FormStyled>
    </FormContainer>
  );
};

export default Form;
