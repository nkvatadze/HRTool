import React from "react";
import { useCollection } from "../context/CollectionContext";
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
    InputLabel,
    Input,
    FormControl,
} from "@mui/material";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import DownloadingIcon from "@mui/icons-material/Downloading";
import MultipleSelectChip from "../components/form/MultipleSelectChip";
import Select from "../components/form/Select";
import NavigateBackButton from "../components/NavigateBackButton";
import { showCandidate } from "../api/candidates";
import Response from "../utils/HttpCodes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateCandidate } from "../api/candidates";

const CandidatesEdit = () => {
    const [candidate, setCandidate] = useState();
    const [statuses, setStatuses] = useState();
    const { candidateId } = useParams();
    const { collection, isLoading } = useCollection();

    const formik = useFormik({
        initialValues: {
            status_id: "",
            status_comment: "",
        },
        onSubmit: async (values) => {
            if (values.status_id === candidate.status_id) {
                return;
            }
            try {
                const res = await updateCandidate(candidate.id, values);
                if (res.status === Response.created) {
                    setCandidate({ ...candidate, status_id: values.status_id });
                    setStatuses([res.data, ...statuses]);
                    formik.setFieldValue("status_comment", "");
                }
            } catch (e) {
                const errors = e.response.data.errors;
                for (const key in errors) {
                    formik.setFieldError(key, errors[key][0]);
                }
            }
        },
    });

    useEffect(() => {
        const fetchCandidate = async () => {
            const res = await showCandidate(candidateId);
            if (res.status === Response.ok) {
                setCandidate(res.data);
                setStatuses(res.data.statuses);
                formik.setFieldValue("status_id", res.data.status_id);
            }
        };

        fetchCandidate();
    }, []);

    if (candidate) {
        return (
            <Container style={{ marginTop: "2rem" }} maxWidth="xl">
                <NavigateBackButton to="/" />
                <Grid container spacing={5}>
                    <Grid item xs={7}>
                        <Stack
                            style={{ padding: 20, marginTop: 20 }}
                            component={Paper}
                            elevation={3}
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Typography variant="h6">
                                Candidate's information
                            </Typography>
                            <Typography variant="subtitle1">
                                See candidate's information
                            </Typography>
                            <Divider style={{ width: "100%" }} />

                            <Grid
                                container
                                spacing={4}
                                style={{ marginTop: 2 }}
                            >
                                <Grid item xs={6}>
                                    <FormControl disabled variant="standard">
                                        <InputLabel htmlFor="first_Name">
                                            First name
                                        </InputLabel>
                                        <Input
                                            id="first_name"
                                            value={candidate.first_name}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl disabled variant="standard">
                                        <InputLabel htmlFor="last_name">
                                            Last name
                                        </InputLabel>
                                        <Input
                                            id="last_name"
                                            value={candidate.last_name}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl disabled variant="standard">
                                        <InputLabel htmlFor="min_salary">
                                            Min Salary
                                        </InputLabel>
                                        <Input
                                            id="min_salary"
                                            value={candidate.min_salary || ""}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl disabled variant="standard">
                                        <InputLabel htmlFor="max_salary">
                                            Max Salary
                                        </InputLabel>
                                        <Input
                                            id="max_salary"
                                            value={candidate.max_salary || ""}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    {!isLoading && (
                                        <Select
                                            disabled
                                            value={candidate.position_id}
                                            label="Position"
                                            name="position_id"
                                            options={collection.positions}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    {!isLoading && (
                                        <MultipleSelectChip
                                            disabled
                                            value={candidate.skills}
                                            label="Skills"
                                            name="skills"
                                            options={collection.skills}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl disabled variant="standard">
                                        <InputLabel htmlFor="email">
                                            Email
                                        </InputLabel>
                                        <Input
                                            id="email"
                                            value={candidate.email || ""}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl disabled variant="standard">
                                        <InputLabel htmlFor="years_of_experience">
                                            Years of Experience
                                        </InputLabel>
                                        <Input
                                            id="years_of_experience"
                                            value={
                                                candidate.years_of_experience ||
                                                ""
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        fullWidth
                                        disabled
                                        variant="standard"
                                    >
                                        <InputLabel htmlFor="linkedin_url">
                                            LinkedIn URL
                                        </InputLabel>
                                        <Input
                                            id="linkedin_url"
                                            value={candidate.linkedin_url || ""}
                                        />
                                    </FormControl>
                                </Grid>
                                {candidate.phones &&
                                    candidate.phones.map((phone, i) => (
                                        <Grid item xs={12} key={i}>
                                            <FormControl
                                                disabled
                                                fullWidth
                                                variant="standard"
                                            >
                                                <InputLabel
                                                    htmlFor={`phones[${i}]`}
                                                >
                                                    Phone Number {i + 1}
                                                </InputLabel>
                                                <Input
                                                    id={`phones[${i}]`}
                                                    value={phone}
                                                />
                                            </FormControl>
                                        </Grid>
                                    ))}
                                <Grid item xs={6}>
                                    {candidate.has_cv && (
                                        <Button
                                            variant="contained"
                                            color="info"
                                            size="large"
                                            href={`/api/candidates/${candidate.id}/cv`}
                                            target="_blank"
                                            download
                                            startIcon={<DownloadingIcon />}
                                        >
                                            Download CV
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Update candidate status
                                    </Typography>
                                    <Divider style={{ width: "100%" }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                {!isLoading && (
                                                    <Select
                                                        label="Statuses"
                                                        name="status_id"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        options={
                                                            collection.statuses
                                                        }
                                                        value={
                                                            formik.values
                                                                .status_id
                                                        }
                                                        error={
                                                            formik.touched
                                                                .status_id &&
                                                            Boolean(
                                                                formik.errors
                                                                    .status_id
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .status_id &&
                                                            formik.errors
                                                                .status_id
                                                        }
                                                    />
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={5}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values
                                                            .status_comment
                                                    }
                                                    disabled={
                                                        candidate.status_id ===
                                                        formik.values.status_id
                                                    }
                                                    label="Status Comment"
                                                    name="status_comment"
                                                    error={
                                                        formik.touched
                                                            .status_comment &&
                                                        Boolean(
                                                            formik.errors
                                                                .status_comment
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .status_comment &&
                                                        formik.errors
                                                            .status_comment
                                                    }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                style={{ textAlign: "center" }}
                                            >
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
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid item xs={5}>
                        <Stack
                            component={Paper}
                            elevation={3}
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{
                                padding: 20,
                                marginTop: 20,
                            }}
                        >
                            <Typography variant="h6">
                                Status Timeline
                            </Typography>
                            <Divider style={{ width: "100%", marginTop: 10 }} />
                            <Timeline position="right">
                                {statuses &&
                                    statuses.map((status) => (
                                        <TimelineItem key={status.id}>
                                            <TimelineOppositeContent color="text.secondary">
                                                {new Date(
                                                    status.created_at * 1000
                                                ).toLocaleString([], {
                                                    year: "numeric",
                                                    month: "numeric",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color="secondary" />
                                                <TimelineConnector />
                                            </TimelineSeparator>

                                            <TimelineContent>
                                                <Typography variant="h6">
                                                    {status.name}
                                                </Typography>

                                                <Typography variant="body2">
                                                    {status.comment}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                            </Timeline>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    return <div>Loading</div>;
};

export default CandidatesEdit;
