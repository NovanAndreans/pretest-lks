import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';

export default function EditCategory() {
    const navigate = useNavigate();

    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState("")
    const [validationError, setValidationError] = useState({})
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        axios.get(`/api/tags/${id}`)
            .then(function (response) {
                let tag = response.data
                setName(tag.name);
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
        axios.patch(`/api/tags/${id}`, {
            name: name
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tag updated successfully!',
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
        navigate('/tags')
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">Edit Tag</h4>
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
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
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