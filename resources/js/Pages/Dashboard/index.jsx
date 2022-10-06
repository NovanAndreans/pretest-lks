import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import DataTable from "../../components/DataTable";
import Layout from '../../Layouts/Layout';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                Dashboard
            </Layout>
        );
    }
}

function Title() { return 'Dashboard' };
ReactDOM.render(<Title />, document.getElementById('title'));