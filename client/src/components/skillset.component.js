import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

export default class SkillSetList extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userId: "",
            name: "",
            user: {},
            skillsets: [],
        }

        this.state.userId = this.props.match.params.user_id;
    }

    async componentDidMount() {
        await axios.get('/api/users/' + this.state.userId)
            .then((res) => {
                this.setState({
                    user: res.data,
                    skillsets: res.data.skillsets
                });

            })
            .catch((err) => console.log(err));
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    deleteSkillset(id) {

        axios.delete('/api/skillsets/' + id)
            .then(res => console.log(res.data));

        this.setState({
            skillsets: this.state.skillsets.filter(el => el._id !== id)
        })

    }


    onSubmit(e) {
        e.preventDefault();

        const skillset = {
            name: this.state.name,
            user_id: this.state.userId
        }

        axios.post('/api/skillsets/add', skillset)
            .then((res) => {
                // window.location = "/";
                this.setState({
                    skillsets: res.data.user.skillsets,
                    name: ""
                })

            })
            .catch((err) => console.log(err));


    }

    render() {
        return (
            <div>
                <h3>Edit Skillsets for {this.state.user !== undefined ? this.state.user.username : ""}</h3>

                <div className="col-md-6" >

                    <div className="card">
                        <div className="card-header">
                            Skillsets
                        </div>

                        <div className="card-body">
                            <ol>
                                {this.state.skillsets.map((skillset) => {
                                    return <li key={skillset._id}>{skillset.name} <button onClick={ () => this.deleteSkillset(skillset._id) } className="btn btn-outline-danger btn-sm"><FontAwesomeIcon icon={faMinusCircle} /></button></li>
                                })}
                            </ol>
                        </div>
                    </div>

                </div>


                <div style={{ marginTop: "50px" }}>
                    <h1>Add New</h1>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit">Add</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        )
    }
}