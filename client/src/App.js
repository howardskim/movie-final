import React, { Component } from 'react'
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Landing from './components/Landing';
import Login  from './components/Login';
import SignUp from './components/SignUp';
import SearchLanding from './components/SearchLanding';
import Favorites from './components/Favorites';
import LogOut from './components/LogOut';
import axios from 'axios';
import SlideOut from './components/SlideOut';

const App = () => {
    return (
      <>
        <BrowserRouter>
          <NavbarComponent />
          <SlideOut />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/search/:title" component={SearchLanding} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/logout" component={LogOut} /> 
          </Switch>
        </BrowserRouter>
      </>
    );
}

export default App;

