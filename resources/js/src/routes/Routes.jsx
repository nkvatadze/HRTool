import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Candidates from "../pages/candidates";
import Page404 from "../pages/errors/Page404";

const Routes = () => {
    console.log("as");
    return (
        <Switch>
            <Route exact path="/" element={<Candidates />} />
            <Route path="*" element={<Page404 />} />
        </Switch>
    );
};

export default Routes;
