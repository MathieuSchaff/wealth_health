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
  StyledDivTest,
} from "./form.styled";
import { useState } from "react";
import type { IStyles } from "react-datepicker-ms";
import { DatePicker } from "react-datepicker-ms";
import { format } from "date-fns";
import { addUser } from "../../features/usersSlice";
import { useAppDispatch } from "../../store/hooks";
import { FormSchemaType, FormSchema } from "./FormSchema";
import Modal from "../Modal/Modal";
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

export const FORMAT_OF_DATE = "yyyy-MM-dd";
const styles: IStyles = {
  primarycolor: "#54a0ff",
  secondarycolor: "#DB5461",
};
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

export interface FormProps {
  onSubmit: (formValue: FormSchemaType) => void;
}
const Form = ({ onsubmit }: { onsubmit?: () => void }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const zo = useZorm("signup", FormSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      const dateOfBirth = format(e.data.dateOfBirth, FORMAT_OF_DATE);
      const startDate = format(e.data.startDate, FORMAT_OF_DATE);
      const newUser = {
        ...e.data,
        dateOfBirth,
        startDate,
      };
      dispatch(addUser(newUser));
      setOpenModal(true);
    },
  });
  return (
    <>
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
        <StyledDivTest>
          <LabelTop htmlFor="dateOfBirth">Date of birth</LabelTop>
          <DatePicker
            id="dateOfBirth"
            value={selectedDate}
            onChange={setSelectedDate}
            ariaLabels={ariaLabels}
            styles={styles}
            formatDate={FORMAT_OF_DATE}
            name={zo.fields.dateOfBirth()}
            ariaRequired={true}
            iso={true}
          />

          {zo.errors.dateOfBirth((e) => (
            <ErrorMessage message={e.message} role="alert" />
          ))}
        </StyledDivTest>
        <StyledDivTest>
          <LabelTop htmlFor="startDate">Start Date</LabelTop>
          <DatePicker
            id="startDate"
            value={selectedDate}
            onChange={setSelectedDate}
            ariaLabels={ariaLabels}
            styles={styles}
            maxDate={new Date(2027, 2, 22)}
            formatDate={FORMAT_OF_DATE}
            name={zo.fields.startDate()}
            ariaRequired={true}
            iso={true}
          />
          {zo.errors.startDate((e) => (
            <ErrorMessage message={e.message} role="alert" />
          ))}
        </StyledDivTest>

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
      {openModal && (
        <Modal onClose={() => setOpenModal(false)} />
        // <div>toto</div>
      )}
    </>
  );
};

export default Form;
