import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Candidates from "../pages/candidates";
import CandidatesCreate from "../pages/candidatesCreate";
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
            <Route path="*" element={<Page404 />} />
        </Switch>
    );
};

export default Routes;
