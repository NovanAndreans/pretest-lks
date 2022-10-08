import React, { useEffect, useState, Component } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'
import Session from 'react-session-api'

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationError, setValidationError] = useState({})

    const login = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('email', email)
        formData.append('password', password)

        var response = await axios.post(`http://localhost:8000/api/login`, formData)
        if (response.data['status'] == 'success') {
            Swal.fire({
                icon: "success",
                text: `Welcome ` + response.data['data']['name']
            })
            Session.set("id", response.data['data']['id'])
            Session.set("name", response.data['data']['name'])
            Session.set("fullname", response.data['data']['fullname'])
            Session.set("email", response.data['data']['email'])
            navigate("/rate")
        } else {
            Swal.fire({
                text: 'Wrong Email or Password !',
                icon: "warning"
            })
        }
    }
    return (
        <div className="mt-5 h-100 d-flex container justify-content-center" >
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="" className="h1"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card-body">

                        <Form onSubmit={login}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control autoFocus color='' required placeholder="Type Email Here..." type="email" value={email} onChange={(event) => {
                                            setEmail(event.target.value)
                                        }} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className='mt-2'>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required placeholder="Type Password Here..." type="password" value={password} onChange={(event) => {
                                                setPassword(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <Button variant="primary" className="mt-3 d-flex container justify-content-center" size="md" block="block" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}