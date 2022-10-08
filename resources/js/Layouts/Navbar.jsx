import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Switch, useNavigate } from "react-router-dom";
import Session from 'react-session-api'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'

export default function Navbar() {
    const navigate = useNavigate();
    const logout = async (e) => {
        e.preventDefault();

        var response = await axios.get(`http://localhost:8000/api/logout`)
        if (response.data['status'] == 'success') {
            Swal.fire({
                icon: "success",
                text: `Good Bye ` + Session.get('name')
            })
            Session.clear()
            navigate("/")
        } else {
            Swal.fire({
                text: 'Error',
                icon: "warning"
            })
        }
    }
    return (
        <nav className="main-header navbar navbar-expand navbar-dark">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown user user-menu">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                        <img src="dist/img/user2-160x160.jpg" className="user-image img-circle elevation-2" alt=" User Image" />
                        <span className="hidden-xs">{Session.get('fullname')}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right bg-dark">
                        <li className="user-header">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle img-profil"
                                alt="User Image" />
                            <p>
                                <center>{Session.get('fullname')} <br /> {Session.get('email')}</center>
                            </p>
                        </li>
                        <li className="user-footer mt-4">
                            <Button variant="danger" className=" w-100" size="lg" block="block" onClick={logout}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}