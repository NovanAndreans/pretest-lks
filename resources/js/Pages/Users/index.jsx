import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import DataTable from "../../components/DataTable";

export default class DatatableUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = ['nickname', 'email', 'commonname'];
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">DataTable with default features</h3>
                    </div>
                    <div className="card-body">
                        <DataTable url="http://localhost:8000/api/users" columns={columns} />
                    </div>
                </div>
            </div>
        );
    }
}

function Title() { return 'Users' };

ReactDOM.render(<DatatableUser />, document.getElementById('content'));
ReactDOM.render(<Title />, document.getElementById('title'));