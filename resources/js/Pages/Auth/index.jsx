import React, { useEffect, useState, Component } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'

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

        await axios.post(`http://localhost:8000/api/users`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: nickname + ` Has Been Created`
            })
            navigate("/users")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
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
                                        <Form.Control required placeholder="Type Email Here..." type="email" value={email} onChange={(event) => {
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