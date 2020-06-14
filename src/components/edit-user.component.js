import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            phoneNumber: "",
            skillsets: [],
            hobbies: [],
            id: "",
        }

        this.state.id = this.props.match.params.id;
    }

    componentDidMount() {
        

        axios.get('http://localhost:8080/users/add/prepare')
            .then((res) => {
                console.log(res.data)
                this.setState({
                    skillsets: res.data.skillsets,
                    hobbies: res.data.hobbies,
                })

            })
            .catch((err) => console.log(err));

        //get id from param
        

        axios.get('http://localhost:8080/users/' + this.state.id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    username: res.data.username,
                    phoneNumber: res.data.phone_number,
                    email: res.data.email,
                })
            })
            .catch((err) => console.log(err));
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
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
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
        }

        console.log(user);

        axios.post('http://localhost:8080/users/update/' + this.state.id, user)
            .then(res => window.location = "/")
            .catch((err) => console.log(err));


    }

    render() {
        return (
            <div>
                <h3>Edit User {this.state.username}</h3>
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
                        <input type="submit" value="Update User" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}