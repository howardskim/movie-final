import React from 'react'
import noimage from '../images/noimage.jpg';
import { connect } from 'react-redux';
import * as actions from '../actions'

const Image = function(props) {
  const image = props.info.poster_path ? <img src={`https://image.tmdb.org/t/p/w300/${props.info.poster_path}`} /> : <img src={noimage} />
  const handleClick = (info) => {
    props.handleImageClick(info)
  }
    return (
      <div onClick={() => handleClick(props.info)} className="image-container">
        {image}
      </div>
    );
}

export default connect(null, actions)(Image);