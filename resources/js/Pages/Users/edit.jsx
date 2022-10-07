import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';

export default function EditUser() {
    const navigate = useNavigate();

    const [id, setId] = useState(useParams().id)
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [commonname, setCommonname] = useState("")
    const [validationError, setValidationError] = useState({})
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(function (response) {
                let user = response.data
                setNickname(user.nickname);
                setEmail(user.email);
                setPassword(user.password);
                setCommonname(user.commonname);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])

    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/api/users/${id}`, {
            nickname: nickname,
            email: email,
            password: password,
            commonname: commonname
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: nickname + ' Has Been Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
        navigate('/users')
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">Edit User</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={handleSave}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="nickname">
                                                <Form.Label>Nickname</Form.Label>
                                                <Form.Control required placeholder="Type Nickname Here..." type="text" value={nickname} onChange={(event) => {
                                                    setNickname(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
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
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="commonname">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control placeholder="Type Full Name Here..." type="text" value={commonname} onChange={(event) => {
                                                    setCommonname(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button disabled={isSaving} variant="success" className="mt-2" size="lg" block="block" type="submit">
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}