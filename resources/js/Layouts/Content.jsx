import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
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
import MenuIndex from '../Pages/Menus/index';
import MenuCreate from '../Pages/Menus/create';
import MenuEdit from '../Pages/Menus/edit';

export default function Content({ content }) {

    return (
        <div className="content-wrapper">
            {/* <div className="content-header">
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
            </div> */}
            <section className="content">
                <div className="container-fluid mt-5">
                    {content}
                </div>
            </section>
        </div>
    );
}