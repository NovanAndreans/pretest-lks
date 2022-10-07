import React from 'react';
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import Content from './Layouts/Content';
import Footer from './Layouts/Footer';
import LandingPage from './Pages/LandingPage/index';
// import ProjectShow from "./pages/ProjectShow"

function Index() {
    return (
        <div className="wrapper">
            {/* <Navbar />
            <Sidebar />
            <Content />
            <Footer /> */}
            <LandingPage />
        </div>

    );
}

export default Index;