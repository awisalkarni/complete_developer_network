import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const User = props => (
    <tr>
        <td>
            {props.user.username}
        </td>
        <td>
            {props.user.email}
        </td>
        <td>
            {props.user.phone_number}
        </td>
        <td>

            { props.user.skillsets.slice(0, 3).map((skillset) => {
                return skillset.name;
            }).join(',') }
            <br/>
            <Link to={"/users/details/edit/"+props.user._id}>({props.user.skillsets.length} skillsets) Edit</Link>
        </td>
        <td>
        { props.user.hobbies.slice(0, 3).map((hobby) => {
                return hobby.name;
            }).join(',') }
            <br/>
            <Link to={"/users/details/edit/"+props.user._id}>({props.user.hobbies.length} hobbies) Edit</Link>
        </td>
        <td>
            <Link to={"/users/edit/" + props.user._id}>Edit</Link> | <button className="btn btn-default" onClick={() => props.deleteUser(props.user._id)}>Delete</button> 
        </td>
    </tr>
)

export default class UserList extends Component {

    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);

        this.state = {users: []}
    }

    componentDidMount(){

        axios.get('/api/users/')
            .then(res => {
                console.log(res)
                this.setState({
                    users: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteUser(id){
        axios.delete('/api/users/'+id)
            .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList() {
        return this.state.users.map((user) => {
            return <User user={user} deleteUser={this.deleteUser} key={user._id}/>
        })
    }


    render(){
        return (
            <div>
                <h3>Users <Link to="/users/add" className="btn btn-primary">Add User</Link></h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Skillsets</th>
                            <th>Hobbies</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        );
    }
}