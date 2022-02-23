import React, { useState, useEffect } from "react";
import {
    Button,
    Chip,
    Container,
    Stack,
    Paper,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { fetchCandidates } from "../api/candidates";
import { useCollection } from "../context/CollectionContext";
import { Link, useNavigate } from "react-router-dom";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DownloadingIcon from "@mui/icons-material/Downloading";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Candidates = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [skip, setSkip] = useState(0);
    const { collection, isLoading } = useCollection();

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const res = await fetchCandidates(skip);
                setCandidates(res.data);
            } catch (e) {}
        };
        if (!isLoading) {
            getCandidates();
        }
    }, [skip, isLoading]);

    return (
        <Container>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    style={{ alignSelf: "flex-end", margin: "1rem" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("candidates/create")}
                >
                    Add new Candidate
                </Button>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Candidate</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Skills</TableCell>
                                <TableCell>Sallary Range</TableCell>
                                <TableCell>CV</TableCell>
                                <TableCell>Linked In</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map((candidate) => (
                                <TableRow hover key={candidate.id}>
                                    <TableCell>
                                        <strong>
                                            {candidate.first_name}{" "}
                                            {candidate.last_name}
                                        </strong>
                                        <div>
                                            {
                                                collection.positions.find(
                                                    (position) =>
                                                        position.id ===
                                                        candidate.position_id
                                                ).name
                                            }
                                            {candidate.years_of_experience &&
                                                ` | ${candidate.years_of_experience} years of experience`}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {candidate.phones &&
                                            candidate.phones.map((phone) => (
                                                <p key={phone}>{phone}</p>
                                            ))}
                                        <p>{candidate.email}</p>
                                    </TableCell>
                                    <TableCell>
                                        {candidate.skills &&
                                            candidate.skills.map((skill) => (
                                                <Chip
                                                    key={skill}
                                                    style={{
                                                        marginTop: "5px",
                                                        marginRight: "2px",
                                                    }}
                                                    color="secondary"
                                                    label={
                                                        collection.skills.find(
                                                            (x) =>
                                                                x.id === skill
                                                        ).name
                                                    }
                                                />
                                            ))}
                                    </TableCell>
                                    <TableCell>
                                        {candidate.min_salary} -
                                        {candidate.max_salary}
                                    </TableCell>
                                    <TableCell align="left">
                                        {candidate.has_cv && (
                                            <IconButton
                                                color="info"
                                                size="large"
                                                component={Link}
                                                to={`/candidates/${candidate.id}/cv`}
                                                target="_blank"
                                                download
                                            >
                                                <DownloadingIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="info"
                                            size="large"
                                            href={candidate.linkedin_url}
                                            target="_blank"
                                        >
                                            <LinkedInIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            color="primary"
                                            icon={<CompareArrowsIcon />}
                                            clickable
                                            onClick={() =>
                                                navigate(
                                                    `candidate/${candidate.id}/show`
                                                )
                                            }
                                            label={
                                                collection.statuses.find(
                                                    (status) =>
                                                        status.id ===
                                                        candidate.status_id
                                                ).name
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Container>
    );
};

export default Candidates;
