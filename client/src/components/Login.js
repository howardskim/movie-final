import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions/index";
import { Form, Alert } from "react-bootstrap";
import Header from './Header';

class Login extends Component {
  onSubmit = (formProps) => {
    const movie = this.props.history.location.state;
    if(movie){
      this.props.signinAndSave(formProps, () => {
        this.props.history.push("/favorites");
      }, () => {
        const userID = localStorage.getItem('id');
        const toSave = {
          ...movie,
          userID
        };
        this.props.addMovie(toSave)
      } );
    } else {
      this.props.signin(formProps, () => {
        this.props.history.push("/favorites");
      });
    }
  };
  componentDidMount() {
    //Handles Closing Sidebar Component
    this.props.handleReset();
  }
  componentWillUnmount() {
    this.props.resetErrorMessage();
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <>
      <Header title="Login Page" />
        <form
          onSubmit={handleSubmit(this.onSubmit)}
          className="sign-up-form sign-in-form"
        >
          <label>Email Address: </label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
            className="form-control"
          />
          <label>Password: </label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
            className="form-control"
          />
          {this.props.errorMessage ? (
            <Alert className="mt-4" variant="danger">
              {this.props.errorMessage}
            </Alert>
          ) : (
            ""
          )}
          <button className="btn btn-primary mt-4" type="submit">
            Log in
          </button>
        </form>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: "login",
  })
)(Login);
