import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import Layout from '../Layouts/Layout';
import Swal from 'sweetalert2'

export default class DataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entities: {
                data: [],
                meta: {
                    current_page: 1,
                    from: 1,
                    last_page: 1,
                    per_page: 5,
                    to: 1,
                    total: 1,
                },
            },
            first_page: 1,
            current_page: 1,
            edit: this.props.edit,
            sorted_column: this.props.columns[0],
            offset: 4,
            order: 'asc',
            link: this.props.apiLink,
        };
    }

    handleDelete(data) {
        Swal.fire({
            title: 'Are you sure want to delete ',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/${this.state.link}/${data.id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: data.name + ' Has Been Deleted',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: error,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });

                this.fetchEntities()
            }
        })
    }

    fetchEntities() {
        let fetchUrl = `${this.props.url}/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.meta.per_page}`;
        axios.get(fetchUrl)
            .then(response => {
                this.setState({ entities: response.data });
            })
            .catch(e => {
                console.error(e);
            });
    }

    changePage(pageNumber) {
        this.setState({ current_page: pageNumber }, () => { this.fetchEntities() });
    }

    columnHead(value) {
        return value.split('_').join(' ').toUpperCase()
    }

    pagesNumbers() {
        if (!this.state.entities.meta.to) {
            return [];
        }
        let from = this.state.entities.meta.current_page - this.state.offset;
        if (from < 1) {
            from = 1;
        }
        let to = from + (this.state.offset * 2);
        if (to >= this.state.entities.meta.last_page) {
            to = this.state.entities.meta.last_page;
        }
        let pagesArray = [];
        for (let page = from; page <= to; page++) {
            pagesArray.push(page);
        }
        return pagesArray;
    }

    componentDidMount() {
        this.setState({ current_page: this.state.entities.meta.current_page }, () => { this.fetchEntities() });
    }

    tableHeads() {
        let icon;
        if (this.state.order === 'asc') {
            icon = <i className="fas fa-arrow-up"></i>;
        } else {
            icon = <i className="fas fa-arrow-down"></i>;
        }
        return this.props.columns.map(column => {
            return <th className="table-head" key={column} onClick={() => this.sortByColumn(column)}>
                {this.columnHead(column)}
                {column === this.state.sorted_column && icon}
            </th>
        });
    }

    List() {

        const If = ({ condition, children }) => {
            if (condition) {
                return children;
            } else {
                return null;
            }
        };

        if (this.state.entities.data.length > 0) {
            return this.state.entities.data.map(data => {
                return <tr key={data.id}>
                    {Object.keys(data).map(key => {
                        if (data[key] == data.id) {
                            return null;
                        } else {
                            return <td key={key}>{data[key]}</td>
                        }

                    })}
                    <td>
                        <div className="d-flex justify-content-around">
                            <If condition={this.state.edit} children={<Button
                                className="btn-sm btn-warning">
                                <Link
                                    to={`/${this.state.link}/edit/${data.id}`}><i className="fas fa-edit"></i>
                                </Link></Button>
                            }>
                            </If>

                            <Button className="btn-sm btn-danger" onClick={
                                () => this.handleDelete(data)

                            }><i className="fas fa-trash"></i></Button>
                        </div>
                    </td >
                </tr >
            })
        } else {
            return <tr>
                <td colSpan={this.props.columns.length} className="text-center">No Records Found.</td>
            </tr>
        }
    }

    sortByColumn(column) {
        if (column === this.state.sorted_column) {
            this.state.order === 'asc' ? this.setState({ order: 'desc', current_page: this.state.first_page }, () => { this.fetchEntities() }) : this.setState({ order: 'asc' }, () => { this.fetchEntities() });
        } else {
            this.setState({ sorted_column: column, order: 'asc', current_page: this.state.first_page }, () => { this.fetchEntities() });
        }
    }

    pageList() {
        return this.pagesNumbers().map(page => {
            return <li className={page === this.state.entities.meta.current_page ? 'page-item active' : 'page-item'} key={page}>
                <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
            </li>
        })
    }

    render() {
        return (
            <Layout><div className="data-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody>{this.List()}</tbody>
                </table>
                {(this.state.entities.data && this.state.entities.data.length > 0) &&
                    <div className="d-flex justify-content-between">
                        <div>
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link"
                                        disabled={1 === this.state.entities.meta.current_page}
                                        onClick={() => this.changePage(this.state.entities.meta.current_page - 1)}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {this.pageList()}
                                <li className="page-item">
                                    <button className="page-link"
                                        disabled={this.state.entities.meta.last_page === this.state.entities.meta.current_page}
                                        onClick={() => this.changePage(this.state.entities.meta.current_page + 1)}
                                    >
                                        Next
                                    </button>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <span style={{ marginTop: '8px' }}> &nbsp; <i>Displaying {this.state.entities.data.length} of {this.state.entities.meta.total} entries.</i></span>
                        </div>
                    </div>

                }
            </div></Layout>
        );
    }
}