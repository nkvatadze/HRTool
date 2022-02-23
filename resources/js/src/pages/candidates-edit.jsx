import React from "react";
import {
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    Grid,
    Divider,
    Button,
    IconButton,
    InputLabel,
    Input,
    FormControl,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import MultipleSelectChip from "../components/form/MultipleSelectChip";
import Select from "../components/form/Select";
import { useCollection } from "../context/CollectionContext";
import { showCandidate } from "../api/candidates";
import Response from "../utils/HttpCodes";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Label } from "@mui/icons-material";

const CandidatesEdit = () => {
    const [candidate, setCandidate] = useState();
    const { candidateId } = useParams();
    const navigate = useNavigate();
    const { collection, isLoading } = useCollection();

    useEffect(() => {
        const fetchCandidate = async () => {
            const res = await showCandidate(candidateId);
            if (res.status === Response.ok) {
                console.log(res);
                setCandidate(res.data);
            }
        };

        fetchCandidate();
    }, []);

    if (candidate) {
        return (
            <Container style={{ marginTop: "2rem" }}>
                <IconButton aria-label="back" onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                </IconButton>
                <Grid container spacing={5}>
                    <Grid item xs={8}>
                        <Stack
                            style={{ padding: 20, marginTop: 20 }}
                            component={Paper}
                            elevation={3}
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Typography variant="h6">
                                Update candidate information
                            </Typography>
                            <Typography variant="subtitle1">
                                Fill necessary data to update a candidate
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
                                            value={candidate.min_salary}
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
                                            value={candidate.max_salary}
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
                                            value={candidate.email}
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
                                                candidate.years_of_experience
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl disabled variant="standard">
                                        <InputLabel htmlFor="linkedin_url">
                                            LinkedIn URL
                                        </InputLabel>
                                        <Input
                                            id="linkedin_url"
                                            value={candidate.linkedin_url}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    {!isLoading && (
                                        <Select
                                            label="Statuses"
                                            name="status_id"
                                            options={collection.statuses}
                                            value={candidate.status_id}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Status Comment"
                                        name="status_comment"
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
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack
                            style={{ padding: 20, marginTop: 20 }}
                            component={Paper}
                            elevation={3}
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Typography variant="h6">
                                Status Timeline
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    return <div>Loading</div>;
};

export default CandidatesEdit;
