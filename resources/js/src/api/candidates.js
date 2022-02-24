import client from "./axios";

export const fetchCandidates = (skip = 0) =>
    client.get("/candidates", {
        params: {
            skip: skip,
        },
    });

export const storeCandidate = (data) => client.post("/candidates", data);

export const destroyCandidate = (id) => client.delete(`/candidates/${id}`);

export const showCandidate = (id) => client.get(`/candidates/${id}`);

export const updateCandidate = (id, data) =>
    client.patch(`/candidates/${id}`, data);
