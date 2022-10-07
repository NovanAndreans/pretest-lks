import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; Link
import UserIndex from "../Pages/Users/index"
import UserCreate from "../Pages/Users/create"
import UserEdit from "../Pages/Users/edit"
import Dashboard from '../Pages/Dashboard';
import CategoryIndex from '../Pages/Categorys/index';
import CategoryCreate from '../Pages/Categorys/create';
import CategoryEdit from '../Pages/Categorys/edit';
import TagIndex from '../Pages/Tags/index';
import TagCreate from '../Pages/Tags/create';
import TagEdit from '../Pages/Tags/edit';

export default function Content() {
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard v1</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />

                        <Route path="users" element={<UserIndex />} />
                        <Route path="users/create" element={<UserCreate />} />
                        <Route path="users/edit/:id" element={<UserEdit />} />

                        <Route path="categorys" element={<CategoryIndex />} />
                        <Route path="categorys/create" element={<CategoryCreate />} />
                        <Route path="categorys/edit/:id" element={<CategoryEdit />} />

                        <Route path="tags" element={<TagIndex />} />
                        <Route path="tags/create" element={<TagCreate />} />
                        <Route path="tags/edit/:id" element={<TagEdit />} />
                    </Routes>
                </div>
            </section>
        </div>
    );
}