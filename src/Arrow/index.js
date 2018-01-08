import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

Arrow.propTypes = {
  left: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function Arrow({ left, onClick }) {
  return (
    <span
      className={`Arrow ${left ? 'Arrow-left' : 'Arrow-right'}`}
      onClick={onClick}
    />
  );
}
