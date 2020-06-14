import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            phoneNumber: "",
            skillsets: [],
            hobbies: [],

        }
    }

    componentDidMount() {
        axios.get('/api/users/add/prepare')
            .then((res) => {
                this.setState({
                    skillsets: res.data.skillsets,
                    hobbies: res.data.hobbies,
                })

            })
            .catch((err) => console.log(err));
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
        }

        console.log(user);

        axios.post('/api/users/add', user)
            .then(res => {
                window.location = '/skillset/edit/'+res.data.user._id;
            })
            .catch((err) => console.log(err));


    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}