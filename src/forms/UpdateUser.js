import React, {Component} from 'react';
import UserConsumer from "../context";
import axios from 'axios';


class UpdateUser extends Component {
    state = {
        name: "",
        salary: "",
        department: "",
        error: false
    }

    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        })

    }

    componentDidMount = async () => {
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        const {name, salary, department} = response.data;
        this.setState({
            name,
            salary,
            department
        });
    }

    validateForm = () => {
        const {name, salary, department} = this.state;
        if (name === "" || salary === "" || department === "") {
            return false
        }
        return true
    }
    updateUser = async (dispatch, e) => {
        e.preventDefault();
        //UpdateUser
        const {name, salary, department} = this.state;
        const {id} = this.props.match.params;
        const updatedUser = {
            name,
            salary,
            department
        };
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser)
        dispatch({type: "UPDATE_USER", payload: response.data});

        this.props.history.push("/");
    }

    render() {
        const {name, department, salary, error} = this.state
        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-12 mb-4">


                            <div className="card">
                                <div className="card-header">
                                    <h4>Update User Form</h4>
                                </div>
                                <div className="card-body">
                                    {
                                        error ? <div className="alert alert-danger">
                                            Lütfen Bilgilerinizi Kontrol Edin...
                                        </div> : null

                                    }
                                    <form onSubmit={this.updateUser.bind(this, dispatch)}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input name="name" id="id" placeholder="Enter Name"
                                                   className="form-control"
                                                   onChange={this.onChangeInput}
                                                   value={name}
                                                   type="text"/>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Department">Department</label>
                                            <input name="department" id="department" placeholder="Enter Department"
                                                   onChange={this.onChangeInput}
                                                   className="form-control"
                                                   value={department}
                                                   type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="salary">Salary</label>
                                            <input name="salary" id="salary" placeholder="Enter Salary"
                                                   className="form-control"
                                                   onChange={this.onChangeInput}
                                                   value={salary}
                                                   type="text"/>
                                        </div>
                                        <button className="btn btn-danger btn-block" type="submit">Update User</button>
                                    </form>
                                </div>
                            </div>


                        </div>
                    );
                }
            }
        </UserConsumer>


    }
}

export default UpdateUser;