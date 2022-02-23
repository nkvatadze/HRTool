import client from "./axios";

export const fetchCandidates = (skip = 0) =>
    client.get("/candidates", {
        params: {
            skip: skip,
        },
    });

export const storeCandidate = (data) => client.post("/candidates", data);
