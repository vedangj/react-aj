import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import _ from 'lodash';

import Form from './Form';
import UserCard from './UserCard';

import { login } from '../../actions/auth'

const Login = (props) => {
  const { users, selectedUser, login, auth} = props;
  let userList;
  // console.log(props);
  const { from } = props.location.state || { from: { pathname: '/' } };
  if(auth.id) {
    return <Redirect to={from} />
  }

  if(!_.isEmpty(users)) {
    userList = _.map(users).map(user => {
      const avatarUrl = {
        backgroundImage: `url("${user.avatarURL}")`
      }
      return (
        <UserCard 
          key={user.id}
          avatar={avatarUrl}
          user={user}
          selectedUser={selectedUser && selectedUser.id}
        />
      )
    });
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { username: { value: username }, password: { value: password } } = e.target
    login({selectedUser: selectedUser.id, username, password })
  }

  

  return (
    <div className="login">
      <div className="content-center">
        <div className="login-card">
          <div className="login-card-left">
            <div className="login-card-header">
              
              <h2>Let me know who you are?</h2>
              <p>Please select from below list</p>
            </div>
            <div className="login-users">
              {userList}
            </div>
          </div>
          <div className="login-card-right">
            <div className="login-card-header">
            <h1>Would You Rather</h1>
              <h2>Sign in <span>{!_.isEmpty(selectedUser) && `as ${selectedUser.name}`}</span></h2>
              {
                auth.error && 
                <span className="badge text-danger">Please enter the valid username!</span>
              }
            </div>
            <Form onSubmit={handleSubmit} disabled={_.isEmpty(selectedUser)} />
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  users: PropTypes.shape({}).isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.users.all || {},
  selectedUser:state.users.selectedUser || {},
  auth: state.auth
})

export default connect(mapStateToProps, {login})(Login)
