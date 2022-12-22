import * as yup from "yup";

const schema = yup.object().shape({
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dateOfBirth: yup.date().required("age is required"),
  startDate: yup.date().required("age is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("age is required"),
  zipCode: yup.number().required("Zip code is required"),
  department: yup.string().required("age is required"),
});
type User = yup.InferType<typeof schema>;

// try {
//     const validationResult = await schema.validate(formData, {
//       abortEarly: false,
//       strict: true,
//     });
//   } catch (err: any) {
//     const validationErrors: any = {};
//     err.inner.forEach((error: { path: string | number; message: string }) => {
//       if (error.path) {
//         validationErrors[error.path] = error.message;
//       }
//     });
//     setErrors(validationErrors);
//     console.log("validationErrors", validationErrors);
//     return validationErrors;
//   }
// interface IBasedErrorsValues {
//     age: number | null;
//     firstName: string | null;
//     lastName: string | null;
//     street: string;
//     city: string | null;
//     state: string | null;
//     zipCode: number | null;
//     department: string | null;
//   }

// const [errors, setErrors] = useState<IBasedErrorsValues | null>(null);
