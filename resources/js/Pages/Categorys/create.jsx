import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateCategory() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    // const [position, setPosition] = useState("")
    const [validationError, setValidationError] = useState({})

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('categoryname', name)
        // formData.append('position', position)

        await axios.post(`http://localhost:8000/api/categorys`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: name + ` Has Been Created`
            })
            navigate("/categorys")
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">Add Category</h4>
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
                                <Form onSubmit={createUser}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="nickname">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control required placeholder="Type Name Here..." type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col>
                                            <Form.Group controlId="email">
                                                <Form.Label>Position</Form.Label>
                                                <Form.Control placeholder="Type Position Here..." type="number" value={position} onChange={(event) => {
                                                    setPosition(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row> */}
                                    <Button variant="success" className="mt-2" size="lg" block="block" type="submit">
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