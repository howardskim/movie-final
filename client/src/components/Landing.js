import React, { Component } from 'react'
import Image from './Image';
import Spinner from './Spinner';
import axios from 'axios';
import Header from './Header';
import * as actions from '../actions'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../App.css';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          baseURL: "https://image.tmdb.org/t/p/w500",
          currentPage: 1,
          itemsToShow: 20,
          totalPages: 0,
          show: false
        };
    }
    componentDidMount(){
      console.log(process.env)
        this.props.getInitialMovies(this.state.currentPage)
    }
    componentWillUnmount(){
      this.props.handleReset();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.data.loading !== this.props.data.loading){
            this.setState({
              loading: false,
              currentPage: this.props.data.page,
              totalPages: this.props.data.total_pages
            });
        }
        if (prevProps.sidebar.show !== this.props.sidebar.show) {
          this.setState({
            show: this.props.sidebar.show,
          });
        }
    }
    renderImages = () => {
        let { data, currentPage, itemsToShow } = this.state;
        return this.props.data.results.map((item, index) => {
            return (
                <Image key={index} info={item}/>
            )
        })
    }
    handlePrevious = () => {
        let { currentPage } = this.state;
        if(currentPage === 1) return;
        this.props.handleNext(null, currentPage - 1);
        this.setState({
            currentPage: currentPage - 1,
        });
    }
    handleNext = () => {
        let { currentPage } = this.state;
        if(currentPage > this.state.totalPages) return;
        this.props.handleNext(null, currentPage + 1);
        this.setState({
            currentPage: currentPage + 1
        })
    }
    render() {
      const opacity = this.state.show ? 'entire-container' : '';
        return (
          <>
            <div className={opacity}>
              {this.state.loading ? (
                <Spinner />
              ) : (
                <>
                  <Header title="Popular Movies 🍿" />
                  <div className="landing-container">{this.renderImages()}</div>
                  <h5 style={{ color: "white", textAlign: "center" }}>
                    Page: {this.state.currentPage} / {this.state.totalPages}
                  </h5>
                  <div className="button-container mb-3">
                    <Button variant="secondary" onClick={this.handlePrevious}>
                      <i className="material-icons right">arrow_back</i>Previous
                    </Button>
                    <Button variant="secondary" onClick={this.handleNext}>
                      Next<i className="material-icons right">arrow_forward</i>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        );
    }
}
function mapStateToProps(state){
    return {
        data: state.search,
        sidebar: state.sidebar
    }
}
export default connect(mapStateToProps, actions)(Landing);