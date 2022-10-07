import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-primary sidebar-light-primary elevation-4">
            <a href="" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: " .8" }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                        <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? 'nav-link js-scroll-trigger active' : 'nav-link js-scroll-trigger')} to={'/dashboard'}>
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link js-scroll-trigger" to={'/users'}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>Users</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link js-scroll-trigger" to={'/categorys'}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>Category</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link js-scroll-trigger" to={'/tags'}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>Tag</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link js-scroll-trigger" to={'/menus'}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>Menu</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}