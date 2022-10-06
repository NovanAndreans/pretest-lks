import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserIndex from "./Pages/Users/index"
import UserCreate from "./Pages/Users/create"
import UserEdit from "./Pages/Users/edit"
// import ProjectShow from "./pages/ProjectShow"

function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<UserIndex />} />
                <Route exact path="users" element={<UserIndex />} />
                <Route path="user/create" element={<UserCreate />} />
                <Route path="user/edit/:id" element={<UserEdit />} />
                {/* <Route path="/show/:id"  element={<ProjectShow/>} /> */}
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById('content')) {
    ReactDOM.render(<Main />, document.getElementById('content'));
}