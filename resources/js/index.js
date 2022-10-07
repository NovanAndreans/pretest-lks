import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import Content from './Layouts/Content';
import Footer from './Layouts/Footer';
import LandingPage from './Pages/LandingPage/index';
import LoginPage from './Pages/Auth';
// import ProjectShow from "./pages/ProjectShow"

function Index() {
    return (
        <Routes>
            <Route exact path="/" element={
                <div className="wrapper">
                    <LoginPage />
                    {/* <Navbar />
            <Sidebar />
            <Content />
            <Footer /> */}
                    {/* <LandingPage /> */}
                </div>} />

            <Route path="/rate" element={
                <div className="wrapper">
                    <LandingPage />
                </div>} />
            <Route path="/admin" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content />
                    <Footer />
                </div>} />

        </Routes>

    );
}

export default Index;