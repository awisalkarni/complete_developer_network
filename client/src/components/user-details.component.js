import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

export default class UserDetails extends Component {

    constructor(props) {
        super(props);

        this.onChangeSkillSetName = this.onChangeSkillSetName.bind(this);
        this.onChangeHobbyName = this.onChangeHobbyName.bind(this);
        this.onSubmitSkillSet = this.onSubmitSkillSet.bind(this);
        this.onSubmitHobby = this.onSubmitHobby.bind(this);

        this.state = {
            userId: "",
            skillsetName: "",
            hobbyName: "",
            user: {},
            skillsets: [],
            hobbies: [],
        }

        this.state.userId = this.props.match.params.user_id;
    }

    async componentDidMount() {
        await axios.get('/api/users/' + this.state.userId)
            .then((res) => {
                this.setState({
                    user: res.data,
                    skillsets: res.data.skillsets,
                    hobbies: res.data.hobbies
                });

            })
            .catch((err) => console.log(err));
    }

    onChangeSkillSetName(e) {
        this.setState({
            skillsetName: e.target.value
        })
    }

    onChangeHobbyName(e) {
        this.setState({
            hobbyName: e.target.value
        })
    }

    deleteSkillset(id) {

        axios.delete('/api/skillsets/' + id)
            .then(res => console.log(res.data));

        this.setState({
            skillsets: this.state.skillsets.filter(el => el._id !== id)
        })

    }

    deleteHobby(id) {

        axios.delete('/api/hobbies/' + id)
            .then(res => console.log(res.data));

        this.setState({
            hobbies: this.state.hobbies.filter(el => el._id !== id)
        })

    }


    onSubmitSkillSet(e) {
        e.preventDefault();

        const skillset = {
            name: this.state.skillsetName,
            user_id: this.state.userId
        }

        axios.post('/api/skillsets/add', skillset)
            .then((res) => {
                // window.location = "/";
                this.setState({
                    skillsets: res.data.user.skillsets,
                    skillsetName: ""
                })

            })
            .catch((err) => console.log(err));


    }

    onSubmitHobby(e) {
        e.preventDefault();

        const hobby = {
            name: this.state.hobbyName,
            user_id: this.state.userId
        }

        axios.post('/api/hobbies/add', hobby)
            .then((res) => {
                // window.location = "/";
                this.setState({
                    hobbies: res.data.user.hobbies,
                    hobbyName: ""
                })

            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>Edit {this.state.user !== undefined ? this.state.user.username : ""}</h3>

                <div className="row">

                    <div className="col-md-6" >

                        <div className="card">
                            <div className="card-header">
                                Skillsets
                        </div>

                            <div className="card-body">

                                <ol>
                                    {this.state.skillsets.map((skillset) => {
                                        return <li key={skillset._id}>{skillset.name} <button onClick={() => this.deleteSkillset(skillset._id)} className="btn btn-outline-danger btn-sm"><FontAwesomeIcon icon={faMinusCircle} /></button></li>
                                    })}
                                </ol>


                                <div style={{ marginTop: "50px" }}>
                                    <h4>Add New Skillset</h4>

                                    <form onSubmit={this.onSubmitSkillSet}>
                                        <div className="form-group">
                                            <div className="input-group mb-3">
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.skillsetName}
                                                    onChange={this.onChangeSkillSetName}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="submit">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="col-md-6" >

                        <div className="card">
                            <div className="card-header">
                                Hobbies
                        </div>

                            <div className="card-body">


                                <ol>
                                    {this.state.hobbies.map((hobby) => {
                                        return <li key={hobby._id}>{hobby.name} <button onClick={() => this.deleteHobby(hobby._id)} className="btn btn-outline-danger btn-sm"><FontAwesomeIcon icon={faMinusCircle} /></button></li>
                                    })}
                                </ol>

                                <div style={{ marginTop: "50px" }}>
                                    <h4>Add New Hobby</h4>

                                    <form onSubmit={this.onSubmitHobby}>
                                        <div className="form-group">
                                            <div className="input-group mb-3">
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    
                                                    value={this.state.hobbyName}
                                                    onChange={this.onChangeHobbyName}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="submit">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>



            </div >
        )
    }
}