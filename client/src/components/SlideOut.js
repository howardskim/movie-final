import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
class SlideOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            title: null,
            trailer: null,
            saved: false
        }
    }
    componentDidMount(){
      
    }
    componentWillUnmount(){
      this.props.handleReset();
    }
    componentDidUpdate(prevProps, prevState){
      if(prevProps.sidebar.show !== this.props.sidebar.show){
        let { title, original_title, overview, results } = this.props.sidebar.info;
            let trailer = results && results.length ? results.filter((obj) => {
              let { type } = obj;
              if(type === 'Trailer'){
                return true;
              }
            }) : '';
            this.setState({
              show: this.props.sidebar.show,
              title,
              overview,
                trailer
              })
            }
      if(prevProps.sidebar.saved !== this.props.sidebar.saved){
        this.setState({
          saved: this.props.sidebar.saved
        })
      }
    }

    closeSidebar = () => {
        this.props.closeSidebar()
    }
    handleClick = () => {
      const toAdd = {
        ...this.props.sidebar.info,
        userID: localStorage.getItem('id')
      }
      this.props.addMovie(toAdd);
    }
    render() {
      const { authenticated } = this.props.userInfo;
        let visible = this.state.show ? 'slide-container showThis' : 'slide-container hideThis'
        return (
          <div className={visible}>
            <div className="close-button-container">
              <button
                onClick={this.closeSidebar}
                className="btn blue-grey lighten-5"
              >
                <i
                  style={{ color: "white", border: "1px solid white" }}
                  className="material-icons"
                >
                  close
                </i>
              </button>
            </div>
            <div className="detail-container">
              <h1>{this.state.title}</h1>
              <Card>
                <Card.Body>
                  <Card.Text>{this.state.overview}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {this.state.trailer && this.state.trailer[0] ? (
                    <ListGroupItem>
                      <a
                        target="_blank"
                        href={`http://www.youtube.com/watch?v=${this.state.trailer[0].key}`}
                      >
                        WATCH TRAILER
                      </a>
                    </ListGroupItem>
                  ) : (
                    ""
                  )}
                  {authenticated ? (
                    <ListGroupItem>
                      <Link to="/favorites">View Bookmarks</Link>
                    </ListGroupItem>
                  ) : null}
                </ListGroup>
                <Card.Body>
                  {authenticated ? (
                    !this.state.saved ? (
                      <Button onClick={this.handleClick}>
                        Click to Bookmark
                      </Button>
                    ) : (
                      <Button>Bookmarked!</Button>
                    )
                  ) : (
                    <Button onClick={() => this.props.history.push("/login", this.props.sidebar.info)}>
                      SIGN IN TO BOOKMARK
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        );
    }
}
function mapStateToProps(state){
    return {
        sidebar: state.sidebar,
        userInfo: state.auth
    }
}
export default connect(mapStateToProps, actions)(withRouter(SlideOut));
