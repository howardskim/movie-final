import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions/index';
import { Form, Alert } from 'react-bootstrap';
import Header from "./Header";

class SignUp extends Component {
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/favorites')
        })
    }
    componentDidMount(){
      //handles sidebar closing
        this.props.handleReset();
    }
    componentWillUnmount(){
      this.props.resetErrorMessage();
    }
    render() {
        const { handleSubmit } = this.props;
        return (
          <>
          <Header title="Sign Up Below" />
          <form onSubmit={handleSubmit(this.onSubmit)} className="sign-up-form">
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
              Sign Up
            </button>
          </form>
          </>
        );
    }
}

function mapStateToProps(state){
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'signup'
    })
)(SignUp)


