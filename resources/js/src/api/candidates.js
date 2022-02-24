import client from "./axios";

export const fetchCandidates = (page, per_page, search) =>
    client.get("/candidates", {
        params: {
            page,
            per_page,
            search,
        },
    });

export const storeCandidate = (data) => client.post("/candidates", data);

export const destroyCandidate = (id) => client.delete(`/candidates/${id}`);

export const showCandidate = (id) => client.get(`/candidates/${id}`);

export const updateCandidate = (id, data) =>
    client.patch(`/candidates/${id}`, data);
