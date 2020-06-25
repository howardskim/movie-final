import React, { Component } from 'react';
import M from "materialize-css";
import { Link, withRouter } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../App.css';

class NavbarComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      show: false
    }
  }
  handleChange = (e) =>{
    let typed = e.target.value;
    this.setState({
      value: typed
    })
  }
  handleSearch = () => {
    if(!this.state.value) return;
    this.props.handleSearch(this.state.value);
    this.props.history.push(`/search/${this.state.value}`)
    this.setState({
      value: ''
    })
  }
  handleReset = () => {
    this.props.getInitialMovies(1)
  }

  handleSubmit = (e) => {
    if(!this.state.value) return;
    if(e.which === 13){
      this.handleSearch();
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.sidebar.show !== this.props.sidebar.show){
      this.setState({
        show: this.props.sidebar.show
      })
    }
  }
    render() {
      //if sidebar is open, add the class entire-container
        return (
          <>
            <Navbar bg="dark" expand="lg">
              <Navbar.Brand>
                <Link
                  onClick={this.handleReset}
                  style={{ marginLeft: "1%" }}
                  to="/"
                  className="white"
                >
                  MERN MOVIE
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent: 'flex-end'}}>
                <Nav className="">
                  {this.props.auth ? (
                    
                      <span>
                        <Link className="nav-link" to="/favorites">My Bookmarks</Link>
                      </span>
                   
                  ) : (
                    ""
                  )}
                  {this.props.auth ? (
                    ""
                  ) : (
                    
                      <span>
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                      </span>
                   
                  )}
                  {this.props.auth ? (
                    ""
                  ) : (
                    
                      <span>
                        <Link className="nav-link" to="/login">Log In</Link>
                      </span>
                   
                  )}
                  {this.props.auth ? (
                    
                      <span>
                        <Link className="nav-link" to="/logout">Log Out</Link>
                      </span>
                   
                  ) : (
                    ""
                  )}
                  <Form inline>
                    <FormControl
                      onChange={this.handleChange}
                      onKeyPress={this.handleSubmit}
                      value={this.state.value}
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2"
                    />
                    <Button
                      onClick={this.handleSearch}
                      variant="primary"
                    >
                      Search
                    </Button>
                  </Form>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </>
        );
    }
}
function mapStateToProps(state){
  return {
    sidebar: state.sidebar,
    auth: state.auth.authenticated

  }
}
export default connect(mapStateToProps, actions)(withRouter(NavbarComponent))