import React from 'react';
import PropTypes from 'prop-types';

const Main = (props) => {
  return <main className="main">{ props.children }</main>;
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
