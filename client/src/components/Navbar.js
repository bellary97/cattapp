import React from 'react'
import {BrowserRouter, Link,Route ,Switch} from "react-router-dom"
import Login from '../components/Login';
import Register from '../components/Register'
import Cats from '../components/Cats'
import Add from '../components/Add'


export default function Navbar() {
     
    return (
        <BrowserRouter>
        <div>
  <nav className="navbar fixed-top  navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand">Cat Clicker app</Link>
    <Link className="navbar-brand" to="/addings"><button className="btn btn-danger">Add Cats</button></Link>
    <Link to="/login"> <button className="btn btn-success" type="submit">Login</button></Link>
     <Link to="/register" className="ml-3"><button className="btn btn-primary">Logout</button></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#"></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#"></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#" ></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
      <Switch>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/movie" component={Cats}/>
      <Route path="/addings" component={Add}/>
      </Switch>
     
        </BrowserRouter>
    )
}
