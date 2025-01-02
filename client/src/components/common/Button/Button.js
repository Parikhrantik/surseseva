import React from "react";
import PropTypes from "prop-types";
import "./Button.css"; // Import styles for the button

const Button = ({ text, onClick, style, disabled }) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  onClick: () => {},
  style: {},
  disabled: false,
};

export default Button;
