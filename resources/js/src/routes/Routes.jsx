import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Candidates from "../pages/candidates";
import CandidatesCreate from "../pages/candidates-create";
import CandidatesEdit from "../pages/candidates-edit";
import Page404 from "../pages/errors/Page404";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" element={<Candidates />} />
            <Route
                exact
                path="/candidates/create"
                element={<CandidatesCreate />}
            />
            <Route
                exact
                path="/candidates/:candidateId/edit"
                element={<CandidatesEdit />}
            />
            <Route path="*" element={<Page404 />} />
        </Switch>
    );
};

export default Routes;
