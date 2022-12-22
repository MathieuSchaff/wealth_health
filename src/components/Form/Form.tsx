import MyDatePicker from "../../components/Datepicker/DatePicker";
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
} from "./styledForm";
import { z } from "zod";
import React, { FormEvent, useState } from "react";
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
const User = z.object({
  age: z.number().gt(0),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  startDate: z.date(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.number().gt(0),
  department: z.string(),
});
// eslint-disable-next-line @typescript-eslint/no-redeclare
type User = z.infer<typeof User>;
const Form = () => {
  // const [formData, setFormData] = useState<User>({
  //   age: 0,
  //   firstName: "",
  //   lastName: "",
  //   dateOfBirth: new Date(),
  //   startDate: new Date(),
  //   street: "",
  //   city: "",
  //   state: "",
  //   zipCode: 0,
  //   department: "",
  // });
  // const [errors, setErrors] = useState<z.ZodError | null>(null);
  const validate = async () => {
    // try {
    //   User.parse(formData);
    // } catch (err) {
    //   if (err instanceof z.ZodError) {
    //     console.log(err.issues);
    //   }
    // }
    // const form = document.querySelector("form");
    // Object.fromEntries(new FormData(form));
    // Object.fromEntries(new FormData(form));
    // console.log("data", new FormData(form));
    // console.log("data", Object.fromEntries(new FormData(form)));
  };
  // function handleChange(event: any) {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   console.log("value", formData);
  // }
  // const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // validate(e);
  //   if (e.target instanceof HTMLFormElement) {
  //     const formData = new FormData(e.target);
  //     const data = User.safeParse(Object.fromEntries(formData));
  //     if (!data.success) {
  //       e.preventDefault();
  //       console.log("error", data.error);
  //       setErrors(data.error);
  //     }
  //   }
  // };
  const zo = useZorm("signup", User, {
    onValidSubmit(e) {
      e.preventDefault();
      alert("Form ok!\n" + JSON.stringify(e.data, null, 2));
    },
  });
  // console.log("zo", zo);
  const disabled = zo.validation?.success === false;
  return (
    <FormContainer className="form-container">
      <a href="employee-list.html">View Current Employees</a>
      <TitleForm>Create Employee</TitleForm>
      <FormStyled action="#" ref={zo.ref}>
        <LabelForm htmlFor="firstName">First Name</LabelForm>
        <InputForm
          type="text"
          name={zo.fields.firstName()}
          className={zo.errors.firstName("errored")}
          // onChange={handleChange}
        />
        {zo.errors.firstName((e) => {
          console.log("e", e);
          return <ErrorMessage message={e.message} />;
        })}

        <LabelForm htmlFor="last-name">Last Name</LabelForm>
        <InputForm
          type="text"
          id="lastName"
          name="lastName"
          // onChange={handleChange}
        />

        <FieldSetForm className="address">
          <LegendFormAdress>Address</LegendFormAdress>

          <LabelForm htmlFor="street">Street</LabelForm>

          <InputForm
            id="street"
            name="street"
            type="text"
            // onChange={handleChange}
          />
          {/* {errors["street"] && <span>This field is required</span>}
          <p>{errors["street"]?.message}</p> */}

          <LabelForm htmlFor="city">City</LabelForm>
          <InputForm
            id="city"
            name="city"
            type="text"
            // onChange={handleChange}
          />
          {/* {errors["city"] && <span>This field is required</span>}
          <p>{errors["city"]?.message}</p> */}

          <LabelForm htmlFor="state">State</LabelForm>
          <Select
            name="state"
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
          {/* {errors["state"] && <span>This field is required</span>} */}

          <LabelForm htmlFor="zip-code">Zip Code</LabelForm>
          <InputForm
            id="zipCode"
            name="zipCode"
            type="number"
            // onChange={handleChange}
          />
        </FieldSetForm>
        {/* {errors["zip-code"] && <span>This field is required</span>} */}

        <LabelForm htmlFor="department">Department</LabelForm>
        <Select
          name="department"
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
        {/* {errors.department && <span>This field is required</span>} */}
        {/* <ButtonSubmit type="submit">Submit</ButtonSubmit> */}
        <button type="submit">Signup!</button>
        {/* <pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre> */}
      </FormStyled>
    </FormContainer>
  );
};

export default Form;
