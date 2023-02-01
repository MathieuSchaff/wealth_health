import { z } from "zod";

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
export type FormSchemaType = z.infer<typeof FormSchema>;
