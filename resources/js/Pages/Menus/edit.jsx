import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { NumericFormat } from "react-number-format";

export default function EditMenu() {
    const navigate = useNavigate();

    const [allcategory, setAllCategory] = useState([]);

    const [id, setId] = useState(useParams().id)
    const [category, setCategory] = useState("")
    const [categoryname, setCategoryName] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [validationError, setValidationError] = useState({})
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        axios.get(`/api/menus/${id}`)
            .then(function (response) {
                let user = response.data
                setCategory(user.category);
                setCategoryName(user.categoryname);
                setName(user.menuname);
                setDescription(user.description);
                setPrice(user.price);
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

    useEffect(() => {
        axios.get(`/api/categorys/all`)
            .then(function (response) {
                setAllCategory(response.data)
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
        axios.patch(`/api/menus/${id}`, {
            idCategory: category,
            menuname: name,
            description: description,
            price: price
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Project updated successfully!',
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
        navigate('/menus')
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">Edit Menu</h4>
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

                                            <Form.Group controlId="name">
                                                <Form.Label>Category</Form.Label>
                                                <select value={category} onChange={(event) => {
                                                    setCategory(event.target.value)
                                                }} className='form-control'>
                                                    <option value=''>{categoryname}</option>
                                                    {
                                                        // allcategory.forEach(element => {
                                                        //     return <option value={element.idCategory}>{element.categoryname}</option>
                                                        // })
                                                        Object.entries(allcategory).map(([key, value]) => (
                                                            <option key={key} value={value.idCategory}>{value.categoryname}</option>
                                                        ))

                                                    }
                                                </select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="description">
                                                <Form.Label>Description</Form.Label>
                                                <textarea
                                                    value={description}
                                                    onChange={(event) => { setDescription(event.target.value) }}
                                                    className="form-control"
                                                    id="description"
                                                    rows="3"
                                                    name="description"></textarea>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="price">
                                                <Form.Label>Price</Form.Label>
                                                <NumericFormat
                                                    className="form-control"
                                                    value={price}
                                                    thousandSeparator={true}
                                                    // prefix={'$'}
                                                    onChange={(event) => {
                                                        setPrice(event.target.value)
                                                    }}
                                                />
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