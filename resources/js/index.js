import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import Content from './Layouts/Content';
import Footer from './Layouts/Footer';
import LandingPage from './Pages/LandingPage/index';
import LoginPage from './Pages/Auth';

import UserIndex from "./Pages/Users/index"
import UserCreate from "./Pages/Users/create"
import UserEdit from "./Pages/Users/edit"
import Dashboard from './Pages/Dashboard';
import CategoryIndex from './Pages/Categorys/index';
import CategoryCreate from './Pages/Categorys/create';
import CategoryEdit from './Pages/Categorys/edit';
import TagIndex from './Pages/Tags/index';
import TagCreate from './Pages/Tags/create';
import TagEdit from './Pages/Tags/edit';
import MenuIndex from './Pages/Menus/index';
import MenuCreate from './Pages/Menus/create';
import MenuEdit from './Pages/Menus/edit';

function Index() {
    return (
        <Routes>
            <Route exact path="/" element={
                <div className="wrapper">
                    <LoginPage />
                </div>} />


            <Route path="/rate" element={
                <div className="wrapper">
                    <LandingPage />
                </div>} />


            <Route path="/dashboard" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<Dashboard />} />
                    <Footer />
                </div>} />
            <Route path="/users" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<UserIndex />} />
                    <Footer />
                </div>} />
            <Route path="/users/create" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<UserCreate />} />
                    <Footer />
                </div>} />
            <Route path="/users/edit/:id" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<UserEdit />} />
                    <Footer />
                </div>} />

            <Route path="/categorys" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<CategoryIndex />} />
                    <Footer />
                </div>} />

            <Route path="/categorys/create" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<CategoryCreate />} />
                    <Footer />
                </div>} />

            <Route path="/categorys/edit/:id" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<CategoryEdit />} />
                    <Footer />
                </div>} />

            <Route path="/tags" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<TagIndex />} />
                    <Footer />
                </div>} />

            <Route path="/tags/create" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<TagCreate />} />
                    <Footer />
                </div>} />

            <Route path="/tags/edit/:id" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<TagEdit />} />
                    <Footer />
                </div>} />

            <Route path="/menus" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<MenuIndex />} />
                    <Footer />
                </div>} />

            <Route path="/menus/create" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<MenuCreate />} />
                    <Footer />
                </div>} />

            <Route path="/menus/edit/:id" element={
                <div className="wrapper">
                    <Navbar />
                    <Sidebar />
                    <Content content={<MenuEdit />} />
                    <Footer />
                </div>} />

        </Routes>

    );
}

export default Index;