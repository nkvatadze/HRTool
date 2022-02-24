import React, { useState, useEffect } from "react";
import {
    Button,
    Chip,
    Container,
    Grid,
    Stack,
    Paper,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    TextField,
} from "@mui/material";
import { fetchCandidates, destroyCandidate } from "../api/candidates";
import { useCollection } from "../context/CollectionContext";
import { useNavigate } from "react-router-dom";
import DownloadingIcon from "@mui/icons-material/Downloading";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Response from "../utils/HttpCodes";
import { getStatusColor } from "../utils/candidates";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../components/form/Select";
const Candidates = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const { collection, isLoading } = useCollection();

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const res = await fetchCandidates(page, perPage, search);
                setCandidates(res.data.candidates);
                setTotal(res.data.total);
            } catch (e) {}
        };
        let timer;
        if (!isLoading) {
            if (search) {
                setPage(0);
                timer = setTimeout(() => {
                    getCandidates();
                }, 1000);
            } else {
                getCandidates();
            }
        }

        return () => clearTimeout(timer);
    }, [page, perPage, search, isLoading]);

    const handleRemove = async (candidateId) => {
        try {
            const res = await destroyCandidate(candidateId);
            if (res.status === Response.no_content) {
                const newCandidates = candidates.filter(
                    (c) => c.id !== candidateId
                );
                setCandidates(newCandidates);
                if (newCandidates.length === 0) {
                    setPage();
                }
            }
        } catch (e) {
            console.dir(e);
        }
    };

    const handlePageChange = (e, newPage) => {
        setPage(newPage);
    };

    const handlePerPageChange = (e) => {
        setPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (value = "") => {
        setSearch(value);
    };

    return (
        <Container maxWidth="xl">
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="standard"
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search"
                            InputProps={{
                                startAdornment: <SearchIcon fontSize="small" />,
                                endAdornment: (
                                    <IconButton
                                        title="Clear"
                                        aria-label="Clear"
                                        size="small"
                                        style={{
                                            visibility: search
                                                ? "visible"
                                                : "hidden",
                                        }}
                                        onClick={() => handleSearchChange()}
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "end" }}>
                        <Button
                            style={{ alignSelf: "flex-end", margin: "1rem" }}
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate("candidates/create")}
                        >
                            Add new Candidate
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell size="small">Candidate</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Skills</TableCell>
                                <TableCell>Sallary Range</TableCell>
                                <TableCell>CV</TableCell>
                                <TableCell>Linked In</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                                <TableCell></TableCell>
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
                                                href={`/api/candidates/${candidate.id}/cv`}
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
                                            color={getStatusColor(
                                                collection.statuses,
                                                candidate.status_id
                                            )}
                                            clickable
                                            label={
                                                collection.statuses.find(
                                                    (status) =>
                                                        status.id ===
                                                        candidate.status_id
                                                ).name
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="info"
                                            onClick={() =>
                                                navigate(
                                                    `candidates/${candidate.id}/edit`,
                                                    {
                                                        state: {
                                                            candidate,
                                                        },
                                                    }
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleRemove(candidate.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={8}
                                    count={total}
                                    rowsPerPage={perPage}
                                    page={page}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handlePerPageChange}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Stack>
        </Container>
    );
};

export default Candidates;
