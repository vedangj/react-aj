import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = rest;
  return (
    <Route
      {...rest}
      render={props => (
        auth.id
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }}
          />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.shape({}).isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
