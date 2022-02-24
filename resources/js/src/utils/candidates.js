export const getStatusColor = (statuses, statusId) => {
    const status = statuses.find((status) => status.id === statusId);
    switch (status.name) {
        case "Rejected":
            return "error";
        case "Hired":
            return "success";
        default:
            return "primary";
    }
};
