import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import PrimaryDetail from "./components/PrimaryDetails"
import OfficialDetails from "./components/OfficialDetails"
import Submission from "./components/Submission"
function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
          <span className="navbar-brand">Infy</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
            <Route exact path = "/home" component={PrimaryDetail}/>
             <Route exact path="/official" component={OfficialDetails}/>
             {/* <Route exact path="/submit" component={Submission}/>       */}
               <Route exact path="/*" render={()=><Redirect to="/home"/>}/>


            
            {/* <Route exact path = "/*" render={()=><Redirect to = "/home"/>}/> */}
          </Switch>
      </div>
    </Router>
  );
}

export default App;
