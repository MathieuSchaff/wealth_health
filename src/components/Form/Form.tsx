import { useZorm } from "react-zorm";
import {
  ButtonSubmit,
  InputForm,
  FormStyled,
  FieldSetForm,
  LegendFormAdress,
  TitleForm,
  LabelFieldSet,
  LabelTop,
  StyledSelect,
  StyledErrorMessage,
} from "./form.styled";
import { z } from "zod";
import { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import { useUsersStore } from "../../store/zustandStore";
import { format } from "date-fns";
export const FORMAT_OF_DATE = "yyyy-MM-dd";
const options = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Legal", label: "Legal" },
];
function ErrorMessage(props: { message: string; role: string }) {
  return <StyledErrorMessage>{props.message}</StyledErrorMessage>;
}

export const FormSchema = z.object({
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
export interface FormProps {
  onSubmit: (formValue: FormSchema) => void;
}
const Form = ({ onsubmit }: { onsubmit?: () => void }) => {
  const addOneUser = useUsersStore((state) => state.addOneUser);
  // const users = useUsersStore((state) => state.users);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const zo = useZorm("signup", FormSchema, {
    onValidSubmit(e) {
      e.preventDefault();
      const dateOfBirth = format(e.data.dateOfBirth, FORMAT_OF_DATE);
      const startDate = format(e.data.startDate, FORMAT_OF_DATE);
      const newUserWithoutId = {
        ...e.data,
        dateOfBirth,
        startDate,
      };
      addOneUser(newUserWithoutId);
      onsubmit?.();
      // const id = e.data.id ?? crypto.randomUUID();
      // const newUserWithId = {
      //   ...e.data,
      //   id,
      //   dateOfBirth,
      //   startDate,
      // };

      // let tx = db?.transaction("usersStore", "readwrite");
      // tx.oncomplete = (ev) => {
      //   console.log(ev);
      // };
      // tx.onerror = (err) => {
      //   console.warn(err);
      // };
      // let store = tx.objectStore("usersStore");
      // store.add(newUserWithId);
      // request.oncomplete = (ev) => {
      //   console.log("successefully added obj");
      // };
      // request.onerror = (err) => {
      //   console.warn("error adding obj");
      // };
    },
  });
  // console.log("users", users);
  return (
    <FormStyled
      action="#"
      ref={zo.ref}
      role="form"
      name="form_user"
      aria-label="Add a user to the company"
    >
      <TitleForm>Create Employee</TitleForm>
      <LabelTop htmlFor="firstName">
        First Name
        <InputForm
          type="text"
          name={zo.fields.firstName()}
          id="firstName"
          aria-label="first name of the user"
          placeholder="John"
          aria-required="true"
        />
      </LabelTop>

      {zo.errors.firstName((e) => (
        <ErrorMessage message={e.message} role="alert" />
      ))}
      <LabelTop htmlFor="lastName">
        Last Name
        <InputForm
          type="text"
          name={zo.fields.lastName()}
          id="lastName"
          aria-label="last name of the user"
          placeholder="Wick"
          aria-required="true"
        />
      </LabelTop>

      {zo.errors.lastName((e) => (
        <ErrorMessage message={e.message} role="alert" />
      ))}
      <LabelTop htmlFor="dateOfBirth">
        Date of birth
        <DatePicker
          aria-label="date of birth of the user"
          id="dateOfBirth"
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date(2018, 7, 22)}
          maxDate={new Date(2027, 2, 22)}
          formatDate={FORMAT_OF_DATE}
          primarycolor="red"
          secondarycolor="purple"
          name={zo.fields.dateOfBirth()}
          ariaRequired={true}
          iso={false}
        />
      </LabelTop>

      {zo.errors.dateOfBirth((e) => (
        <ErrorMessage message={e.message} role="alert" />
      ))}
      <LabelTop htmlFor="startDate">
        Start Date
        <DatePicker
          aria-label="start date of the user in the company"
          id="startDate"
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date(2018, 7, 22)}
          maxDate={new Date(2027, 2, 22)}
          formatDate={FORMAT_OF_DATE}
          primarycolor="red"
          secondarycolor="purple"
          name={zo.fields.startDate()}
          ariaRequired={true}
        />
      </LabelTop>

      {zo.errors.startDate((e) => (
        <ErrorMessage message={e.message} role="alert" />
      ))}
      <FieldSetForm className="address">
        <LegendFormAdress>Address</LegendFormAdress>

        <LabelFieldSet htmlFor="street">
          Street
          <InputForm
            name={zo.fields.street()}
            type="text"
            id="street"
            placeholder="obama street"
            aria-required="true"
          />
        </LabelFieldSet>

        {zo.errors.street((e) => (
          <ErrorMessage message={e.message} role="alert" />
        ))}
        <LabelFieldSet htmlFor="city">
          City
          <InputForm
            name={zo.fields.city()}
            type="text"
            id="city"
            placeholder="Los angeles"
            aria-required="true"
          />
        </LabelFieldSet>

        {zo.errors.city((e) => (
          <ErrorMessage message={e.message} role="alert" />
        ))}
        <LabelFieldSet htmlFor="state">
          State
          <StyledSelect
            inputId="state"
            placeholder="Select your state"
            classNamePrefix="react-select"
            name={zo.fields.state()}
            options={options}
            aria-required="true"
          />
        </LabelFieldSet>

        {zo.errors.state((e) => (
          <ErrorMessage message={e.message} role="alert" />
        ))}

        <LabelFieldSet htmlFor="zipCode">
          Zip Code
          <InputForm
            id="zipCode"
            name={zo.fields.zipCode()}
            type="number"
            aria-required="true"
            placeholder="00112233"
          />
        </LabelFieldSet>

        {zo.errors.state((e) => (
          <ErrorMessage message={e.message} role="alert" />
        ))}
        <LabelFieldSet htmlFor="department">
          Department
          <StyledSelect
            inputId="department"
            name={zo.fields.department()}
            placeholder="Department"
            classNamePrefix="react-select"
            options={options}
            menuPlacement={"auto"}
            aria-required="true"
          />
        </LabelFieldSet>

        {zo.errors.department((e) => (
          <ErrorMessage message={e.message} role="alert" />
        ))}
      </FieldSetForm>

      <ButtonSubmit type="submit">Submit</ButtonSubmit>
    </FormStyled>
  );
};

export default Form;
