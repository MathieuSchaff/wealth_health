import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type Inputs = {
  "first-name": string;
  "last-name": string;
  "date-of-birth": string;
  "start-date": string;
  street: string;
  city: string;
  state: string;
  "zip-code": number;
  department: string;
};
const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
    "first-name": yup.string().required(),
    "last-name": yup.string().required(),
    "date-of-birth": yup.string().required(),
    "start-date": yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    "zip-code": yup.number().required(),
    department: yup.string().required(),
  })
  .required();

const Form = () => {
  console.log("rerender");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="form-container">
      <a href="employee-list.html">View Current Employees</a>
      <h2>Create Employee</h2>
      <form action="#" id="create-employee" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" {...register("first-name")} />
        {errors["first-name"] && <span>This field is required</span>}
        <p>{errors["first-name"]?.message}</p>

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" {...register("last-name")} />
        {errors["last-name"] && <span>This field is required</span>}
        <p>{errors["last-name"]?.message}</p>

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input id="date-of-birth" type="text" {...register("date-of-birth")} />
        {errors["start-date"] && <span>This field is required</span>}
        <p>{errors["start-date"]?.message}</p>

        <label htmlFor="start-date">Start Date</label>
        <input id="start-date" type="text" {...register("start-date")} />
        {errors["date-of-birth"] && <span>This field is required</span>}
        <p>{errors["date-of-birth"]?.message}</p>

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" {...register("street")} />
          {errors["street"] && <span>This field is required</span>}
          <p>{errors["street"]?.message}</p>

          <label htmlFor="city">City</label>
          <input id="city" type="text" {...register("city")} />
          {errors["city"] && <span>This field is required</span>}
          <p>{errors["city"]?.message}</p>

          <label htmlFor="state">State</label>
          <select id="state" {...register("state")}></select>
          {errors["state"] && <span>This field is required</span>}

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" {...register("zip-code")} />
        </fieldset>
        {errors["zip-code"] && <span>This field is required</span>}

        <label htmlFor="department">Department</label>
        <select id="department" {...register("department")}>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
        {errors.department && <span>This field is required</span>}
        <input type="submit" value="Send Request" />
      </form>
    </div>
  );
};

export default Form;
