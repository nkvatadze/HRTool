import client from "./axios";

export const fetchCollection = () => client.get("/");
