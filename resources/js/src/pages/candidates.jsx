import React, { useState, useEffect } from "react";
import { Button, Chip, Container, Stack, Paper } from "@mui/material";
import { fetchCandidates } from "../api/candidates";
import { useCollection } from "../context/CollectionContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useNavigate } from "react-router-dom";

const Candidates = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [skip, setSkip] = useState(0);
    const { collection, isLoading } = useCollection();

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const res = await fetchCandidates(skip);
                console.log(res);
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
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map((candidate) => (
                                <TableRow key={candidate.id}>
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
                                        {candidate.min_salary} -{" "}
                                        {candidate.max_salary}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            color="info"
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
