import React from 'react';
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import Content from './Layouts/Content';
import Footer from './Layouts/Footer';
// import ProjectShow from "./pages/ProjectShow"

function Index() {
    return (
        <div class="wrapper">
            <Navbar />
            <Sidebar />
            <Content />
            <Footer />
        </div>

    );
}

export default Index;