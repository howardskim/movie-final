import React, { Component } from 'react'
import Image from './Image';
import Spinner from './Spinner';
import Header from './Header';
import axios from 'axios';
import * as actions from '../actions'
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";


import '../App.css';

class SearchLanding extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          baseURL: "https://image.tmdb.org/t/p/w500",
          currentPage: 1,
          totalPages: 0,
          show: false,
        };
    }
    componentDidMount(){
        this.props.handleSearch(this.props.match.params.title)
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.data.searched !== this.props.data.searched) {
          this.setState({
            loading: false,
            currentPage: this.props.data.page,
            totalPages: this.props.data.total_pages,
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
                <Image info={item}/>
            )
        })
    }
    handlePrevious = () => {
        let { currentPage } = this.state;
        if(currentPage === 1) return;
        this.props.handleNext(this.props.match.params.title, currentPage - 1);
        this.setState({
            currentPage: currentPage - 1,
        });
    }
    handleNext = () => {
        let { currentPage } = this.state;
        if(currentPage > this.state.totalPages){
          return
        } else {
          this.props.handleNext(this.props.match.params.title, currentPage + 1);
          this.setState({
              currentPage: currentPage + 1
          })
        }
    }
    render() {
      let { currentPage, totalPages} = this.state;
      let disableNextBool = currentPage === totalPages;
      let disablePrevBool = currentPage === 1;
      const opacity = this.state.show ? "entire-container" : "";
        return (
          <>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <div className={opacity}>
              {!this.props.data.results.length && !this.state.loading ? '' : <Header title={`results for: "${this.props.match.params.title}"`} />  }
              {!this.props.data.results.length && !this.state.loading ? <Header title = {`Sorry, no results were found... for "${this.props.match.params.title}"`} /> : <> <div className="landing-container">{this.renderImages()}</div>
              <h5 style={{color: 'white', textAlign: 'center'}}>Page: {this.state.currentPage} / {this.state.totalPages}</h5>
              <div className="button-container mb-3">
                <Button variant="secondary" disabled={disablePrevBool} onClick={this.handlePrevious}>
                  <i className="material-icons right">arrow_back</i>Previous
                </Button >
                <Button variant="secondary" disabled={disableNextBool} onClick={this.handleNext}>
                  Next<i className="material-icons right">arrow_forward</i>
                </Button>
              </div>
              </>
              }
              </div>
            )}
          </>
        );
    }
}
function mapStateToProps(state){
    return {
      data: state.search,
      sidebar: state.sidebar,
    };
}
export default connect(mapStateToProps, actions)(SearchLanding);