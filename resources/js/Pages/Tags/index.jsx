import React, { useEffect, useState, Component } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom';
import DataTable from "../../components/DataTable";
import Layout from '../../Layouts/Layout';

export default class DatatableTag extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = ['tagname', 'tagtype'];
        return (
            <Layout>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h3 className="card-title">DataTable with default features</h3>
                                <Link
                                    className="btn btn-outline-primary"
                                    to={`/tags/create`}>Add Tag
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <DataTable url="http://localhost:8000/api/tags" columns={columns} apiLink="tags" edit={true} />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}