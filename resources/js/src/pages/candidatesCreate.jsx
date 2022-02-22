import React, { useState } from "react";
import { useFormik } from "formik";
import {
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    Grid,
    Divider,
    Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import * as yup from "yup";
import MultipleSelectChip from "../components/form/MultipleSelectChip";
import Select from "../components/form/Select";
import { useCollection } from "../context/CollectionContext";

const validation = yup.object({
    first_name: yup
        .string("Enter candidate's First name")
        .required("First name is required"),
    last_name: yup
        .string("Enter candidate's Last name")
        .required("Last name is required"),

    min_salary: yup
        .number("Min salary must be a number")
        .integer()
        .when("max_salary", {
            is: true,
            then: (schema) =>
                schema.lessThan(
                    yup.ref("max_salary"),
                    "Min salary must be less then max salary"
                ),
        })
        .nullable(true),
    max_salary: yup
        .number("Min salary must be a number")
        .integer()
        .moreThan(
            yup.ref("min_salary"),
            "Max salary must be greater then min salary"
        )
        .nullable(true),
    position_id: yup.number().integer().required("Position field is required"),
    skills: yup.array(),
    email: yup.string().email("Must be a valid e-mail"),
    years_of_experience: yup.number().integer().nullable(true),
    linkedin_url: yup.string("Enter candidate's LinkedIn's URL"),
});

const CandidatesCreate = () => {
    const { collection, isLoading } = useCollection();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            min_salary: "",
            max_salary: "",
            years_of_experience: "",
            position_id: "",
            skills: [],
            linkedin_url: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            Object.keys(values).forEach((key) => {
                if (!values[key]) {
                    delete values[key];
                }
            });
            console.log(values);
        },
    });
    const [formData, setFormData] = useState({});
    const [cv, setCV] = useState();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    // const handleFileChange = (e) => {
    //     setCV(e.target.files[0]);
    // };
    // console.log(cv);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const data = new FormData();
    //     data.append(formData);
    //     if (cv) {
    //         data.append("cv", cv);
    //     }

    //     console.log(data);
    // };
    return (
        <Container style={{ marginTop: "5rem" }}>
            <Stack
                style={{ padding: 20 }}
                component={Paper}
                elevation={3}
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Typography variant="h6">Candidate information</Typography>
                <Typography variant="subtitle1">
                    Fill necessary data to create a candidate
                </Typography>
                <Divider style={{ width: "100%" }} />
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4} style={{ marginTop: 2 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="first_name"
                                name="first_name"
                                label="First Name"
                                variant="standard"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.first_name &&
                                    Boolean(formik.errors.first_name)
                                }
                                helperText={
                                    formik.touched.first_name &&
                                    formik.errors.first_name
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="last_name"
                                name="last_name"
                                label="Last Name"
                                variant="standard"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.last_name &&
                                    Boolean(formik.errors.last_name)
                                }
                                helperText={
                                    formik.touched.last_name &&
                                    formik.errors.last_name
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="number"
                                id="min_salary"
                                name="min_salary"
                                label="Min Salary"
                                variant="standard"
                                value={formik.values.min_salary}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.min_salary &&
                                    Boolean(formik.errors.min_salary)
                                }
                                helperText={
                                    formik.touched.min_salary &&
                                    formik.errors.min_salary
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="number"
                                id="max_salary"
                                name="max_salary"
                                label="Max Salary"
                                variant="standard"
                                value={formik.values.max_salary}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.max_salary &&
                                    Boolean(formik.errors.max_salary)
                                }
                                helperText={
                                    formik.touched.max_salary &&
                                    formik.errors.max_salary
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            {!isLoading && (
                                <Select
                                    label="Position"
                                    name="position_id"
                                    options={collection.positions}
                                    value={formik.values.position_id}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.position_id &&
                                        Boolean(formik.errors.position_id)
                                    }
                                    helperText={
                                        formik.touched.position_id &&
                                        formik.errors.position_id
                                    }
                                />
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {!isLoading && (
                                <MultipleSelectChip
                                    label="Skills"
                                    name="skills"
                                    options={collection.skills}
                                    value={formik.values.skills}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.skills &&
                                        Boolean(formik.errors.skills)
                                    }
                                    helperText={
                                        formik.touched.skills &&
                                        formik.errors.skills
                                    }
                                />
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="email"
                                id="email"
                                name="email"
                                label="Email"
                                variant="standard"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="number"
                                id="years_of_experience"
                                name="years_of_experience"
                                label="Years of experience"
                                variant="standard"
                                value={formik.values.years_of_experience}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.years_of_experience &&
                                    Boolean(formik.errors.years_of_experience)
                                }
                                helperText={
                                    formik.touched.years_of_experience &&
                                    formik.errors.years_of_experience
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="linkedin_url"
                                name="linkedin_url"
                                label="LinkedIn URL"
                                variant="standard"
                                value={formik.values.linkedin_url}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.linkedin_url &&
                                    Boolean(formik.errors.linkedin_url)
                                }
                                helperText={
                                    formik.touched.linkedin_url &&
                                    formik.errors.linkedin_url
                                }
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Button variant="contained" component="label">
                                Upload CV
                                <input
                                    type="file"
                                    id="cv"
                                    name="cv"
                                    onChange={handleFileChange}
                                    hidden
                                />
                            </Button>
                        </Grid> */}
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button
                                color="secondary"
                                type="submit"
                                startIcon={<SaveIcon />}
                                variant="contained"
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Stack>
            {/* <Grid item xs={4}>
                    <Stack
                        style={{ padding: 20 }}
                        component={Paper}
                        elevation={3}
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Typography variant="h6">Status Timeline</Typography>
                    </Stack>
                </Grid> */}
        </Container>
    );
};

export default CandidatesCreate;
