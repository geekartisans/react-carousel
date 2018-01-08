import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';


Slide.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default function Slide({ children, onClick }) {
  return (
    <div
      className="Slide"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
