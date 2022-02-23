import React from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import {
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    Grid,
    Divider,
    Slider,
    Button,
    IconButton,
    FormHelperText,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import MultipleSelectChip from "../components/form/MultipleSelectChip";
import Select from "../components/form/Select";
import { useCollection } from "../context/CollectionContext";
import { storeCandidate } from "../api/candidates";
import { Response } from "../utils/HttpCodes";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import validation from "../validation/candidates/create-validation";

const CandidatesCreate = () => {
    const navigate = useNavigate();
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
            phones: [],
            linkedin_url: "",
            cv: null,
        },
        validationSchema: validation,
        onSubmit: async (values) => {
            //Prepare data for sending
            const formData = new FormData();
            for (const key in values) {
                // If value is an array, we should append each array field individually
                if (Array.isArray(values[key])) {
                    if (values[key].length) {
                        for (const value of values[key]) {
                            formData.append(`${key}[]`, value);
                        }
                    }
                } else if (values[key]) {
                    formData.append(key, values[key]);
                }
            }

            try {
                const res = await storeCandidate(formData);
                if (res.status === Response.created) {
                    navigate("/");
                }
            } catch (e) {
                const errors = e.response.data.errors;
                for (const key in errors) {
                    formik.setFieldError(key, errors[key][0]);
                }
            }
        },
    });

    return (
        <Container style={{ marginTop: "5rem" }}>
            <IconButton aria-label="back" onClick={() => navigate("/")}>
                <ArrowBackIcon />
            </IconButton>
            <Stack
                style={{ padding: 20, marginTop: 20 }}
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
                <form
                    onSubmit={formik.handleSubmit}
                    encType="multipart-form-data"
                >
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
                            {/* <Typography gutterBottom>
                                Years of experience
                            </Typography>
                            <Slider
                                id="years_of_experience"
                                name="years_of_experience"
                                label="Years of experience"
                                defaultValue={
                                    formik.values.years_of_experience || 0
                                }
                                aria-label="years_of_experience"
                                valueLabelDisplay="auto"
                                color="secondary"
                            /> */}
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
                        <FormikProvider value={formik}>
                            <FieldArray
                                name="phones"
                                render={(arrayHelpers) => (
                                    <>
                                        <Grid item xs={12}>
                                            {formik.values.phones.map(
                                                (phone, i) => (
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        key={i}
                                                        style={{
                                                            marginTop: 10,
                                                        }}
                                                    >
                                                        <Grid item xs={10}>
                                                            <TextField
                                                                fullWidth
                                                                label={`Phone Number ${
                                                                    i + 1
                                                                }`}
                                                                variant="standard"
                                                                name={`phones[${i}]`}
                                                                value={phone}
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                                error={
                                                                    formik
                                                                        .errors
                                                                        .phones &&
                                                                    Boolean(
                                                                        formik
                                                                            .errors
                                                                            .phones[
                                                                            i
                                                                        ]
                                                                    )
                                                                }
                                                                helperText={
                                                                    formik
                                                                        .errors
                                                                        .phones &&
                                                                    formik
                                                                        .errors
                                                                        .phones[
                                                                        i
                                                                    ]
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton
                                                                color="error"
                                                                onClick={() =>
                                                                    arrayHelpers.remove(
                                                                        i
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    arrayHelpers.push("")
                                                }
                                            >
                                                Add Phone
                                            </Button>
                                        </Grid>
                                    </>
                                )}
                            />
                        </FormikProvider>
                        <Grid item xs={6}>
                            <Button variant="contained" component="label">
                                Upload CV
                                <input
                                    type="file"
                                    id="cv"
                                    name="cv"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        formik.setFieldValue(
                                            "cv",
                                            e.target.files[0]
                                        );
                                    }}
                                    hidden
                                />
                            </Button>

                            <Typography
                                variant="caption"
                                style={{ marginLeft: 10 }}
                            >
                                {formik.values.cv
                                    ? formik.values.cv.name
                                    : "No file chosen"}
                            </Typography>
                            {formik.errors.cv && (
                                <FormHelperText error>
                                    {formik.errors.cv}
                                </FormHelperText>
                            )}
                        </Grid>
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
