import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
class LogOut extends Component {
    componentDidMount(){
        this.props.signout();
    }
    render() {
        return (
          <>
            <Header title="Sorry to see you go!" />
          </>
        );
    }
}
export default connect(null, actions)(LogOut);
