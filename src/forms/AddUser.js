import React, {Component} from 'react';
import posed from 'react-pose';
import UserConsumer from "../context";
import axios from 'axios';


const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }

});


class AddUser extends Component {
    state = {
        name: "",
        salary: "",
        department: "",
        visible: true,
        error: false
    }

    onVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    validateForm = () => {
        const {name, salary, department} = this.state;
        if (name === "" || salary === "" || department === "") {
            return false
        }
        return true
    }


    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        })

    }

    addUser = async (dispatch, e) => {
        e.preventDefault();
        const {name, department, salary} = this.state;
        const newUser = {
            name,
            salary,
            department
        }

        if(!this.validateForm()){
            this.setState({
                error:true
            })
            return ;
        }

        const response = await axios.post(" http://localhost:3004/users", newUser)
        dispatch({type: "ADD_USER", payload: response.data});

        this.props.history.push("/");

    }

    render() {
        const {visible, name, department, salary,error} = this.state
        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-12 mb-4">
                            <button onClick={this.onVisibility}
                                    className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                            <Animation pose={visible ? "visible" : "hidden"}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Add User Form</h4>
                                    </div>
                                    <div className="card-body">
                                        {
                                            error ?<div className="alert alert-danger">
                                                Lütfen Bilgilerinizi Kontrol Edin...
                                            </div>:null

                                        }


                                        <form onSubmit={this.addUser.bind(this, dispatch)}>
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
                                            <button className="btn btn-danger btn-block" type="submit">Add User</button>
                                        </form>
                                    </div>
                                </div>
                            </Animation>

                        </div>
                    );
                }
            }
        </UserConsumer>


    }
}

export default AddUser;