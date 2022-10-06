import React, { useEffect, useState, Component } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom';
import DataTable from "../../components/DataTable";
import Layout from '../../Layouts/Layout';

export default class DatatableUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = ['nickname', 'email', 'commonname'];
        return (
            <Layout>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h3 className="card-title">DataTable with default features</h3>
                                <Link
                                    className="btn btn-outline-primary"
                                    to="users/create">Add User
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <DataTable url="http://localhost:8000/api/users" columns={columns} apiLink="users" />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

function Title() { return 'Master Users' };
ReactDOM.render(<Title />, document.getElementById('title'));