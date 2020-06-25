import React from 'react'

const Header = (props) => {
    return (
      <React.Fragment>
        <p id="header">{props.title}</p>
      </React.Fragment>
    );
}

export default Header;