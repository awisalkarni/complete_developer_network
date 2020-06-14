import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import UserList from "./components/user-list.component";
import './App.css';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <br />
        <div className="container">
          <div className="auth-wrapper">
            <div className="auth-inner">

              <Route path="/" exact component={ UserList }/>
              <Route path="/users" exact component={ UserList }/>
              <Route path="/users/add" exact component={ CreateUser }/>



            </div>
          </div>
        </div>


      </div>
    </Router>
  );
}

export default App;

