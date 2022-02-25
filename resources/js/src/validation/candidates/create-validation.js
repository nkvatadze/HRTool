import * as yup from "yup";

export default yup.object({
    first_name: yup
        .string("Enter candidate's First name")
        .required("First name is required"),
    last_name: yup
        .string("Enter candidate's Last name")
        .required("Last name is required"),
    min_salary: yup
        .number()
        .typeError("Min salary must be a number")
        .positive("Min salary must be greater then 0")
        .when("max_salary", {
            is: true,
            then: (schema) =>
                schema.lessThan(
                    yup.ref("max_salary"),
                    "Min salary must be less then max salary"
                ),
        })
        .nullable(true)
        .max(1000000, "Min salary mast be less then or equal to 1 000 000"),
    max_salary: yup
        .number()
        .typeError("Max salary must be a number")
        .positive("Max salary must be greater then 0")
        .moreThan(
            yup.ref("min_salary"),
            "Max salary must be greater then min salary"
        )
        .nullable(true)
        .max(1000000, "Max salary mast be less then or equal to 1 000 000"),
    position_id: yup.number().integer().required("Position field is required"),
    skills: yup.array(),
    email: yup.string().email("Must be a valid e-mail"),
    phones: yup
        .array()
        .of(
            yup
                .string()
                .matches(
                    /^[+]?\d+$/,
                    "Phone number isn't in correct format, it should contain only nubers and may start with + sign"
                )
        ),
    years_of_experience: yup
        .number()
        .typeError("Years of experience must be a number")
        .positive("Years of experience must be greater then 0")
        .nullable(true),
    linkedin_url: yup
        .string()
        .matches(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            "Enter candidate's LinkedIn's correct URL"
        ),
});
