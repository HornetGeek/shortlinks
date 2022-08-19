import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export const Button = ({ onClick, text }) => {
  return (
    <div data-v-154c538c="" className="d-flex align-items-center mt-3">
      <button
        data-v-154c538c=""
        onClick={onClick}
        className="btn btn-block btn-t-green btn-xl d-none d-md-block">
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};
Button.defaultProps = {
  onClick: function () {},
  text: ''
};
