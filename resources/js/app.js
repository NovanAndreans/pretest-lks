import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./index"
// import ProjectShow from "./pages/ProjectShow"

function Main() {
    return (
        <Router>
            <Index />
        </Router>

    );
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}