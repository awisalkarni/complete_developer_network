import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Navbar extends Component {


  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Complete Developer Network</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            

            <li className="navbar-item">
              <Link to="/users" className="nav-link">Users</Link>
            </li>

            
          </ul>
        </div>
      </nav>
    );
  }
}