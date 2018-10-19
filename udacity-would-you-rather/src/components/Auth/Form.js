import React from 'react';
import PropTypes from 'prop-types'

const Form = ({ disabled, onSubmit }) => (
  <form className="login-form" onSubmit={onSubmit}>
    <label htmlFor="username" className="sr-only">Email address</label>
    <input
      type="text"
      id="username"
      className="form-control"
      placeholder="User Name"
      disabled={disabled}
      required
    />
    <label htmlFor="password" className="sr-only">Password</label>
    <input
      type="password"
      id="password"
      className="form-control"
      placeholder="Password"
      title="Type a strong password: aBC_123^"
      pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
      disabled={disabled}
      required
    />
    <div className="login-form-footer d-flex justify-content-between pt-3">
      <button className="btn btn-outline-primary btn-block" type="submit" >Sign In</button>
    </div>
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Form;
