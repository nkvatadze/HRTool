import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../routes/Routes";
import { CollectionProvider } from "../context/CollectionContext";
import Header from "./Header";
function App() {
    return (
        <>
            <CollectionProvider>
                <Router>
                    <Header />

                    <Routes />
                </Router>
            </CollectionProvider>
        </>
    );
}

export default App;
