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

                <li className="nav-item">
                    <Button variant="danger" className="w-100" size="md" block="block" onClick={logout}>
                        Logout
                    </Button>
                </li>
            </ul>
        </nav>
    );
}