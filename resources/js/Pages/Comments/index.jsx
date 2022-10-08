import React, { useEffect, useState, Component } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom';
import DataTable from "../../components/DataTable";
import Layout from '../../Layouts/Layout';

export default class DatatableComment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = ['commonname', 'menuname', 'comment'];
        return (
            <Layout>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">DataTable with default features</h3>
                        </div>
                        <div className="card-body">
                            <DataTable url="http://localhost:8000/api/comments" columns={columns} apiLink="comments" edit={false} />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}