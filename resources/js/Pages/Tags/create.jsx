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
    const [type, setType] = useState("")
    const [validationError, setValidationError] = useState({})

    const createTag = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('tagname', name)
        formData.append('tagtype', type)

        await axios.post(`http://localhost:8000/api/tags`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/tags")
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
                                <h4 className="card-title">Add Tag</h4>
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
                                <Form onSubmit={createTag}>
                                    <Row>
                                        <Col>

                                            <Form.Group controlId="name">
                                                <Form.Label>Type</Form.Label>
                                                <select value={type} onChange={(event) => {
                                                    setType(event.target.value)
                                                }} className='form-control'>
                                                    <option value=''>Choose Type</option>
                                                    <option value='worst'>Worst</option>
                                                    <option value='normal'>Normal</option>
                                                    <option value='best'>Best</option>
                                                </select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="nickname">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
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