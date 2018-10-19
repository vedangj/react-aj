import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setUser } from '../../actions/users';

const UserCard = props => {
  const {avatar, user, selectedUser, dispatch} = props;
  return (
    <label className="user-radio d-flex" htmlFor={user.id}>
      <input
        type="radio"
        id={user.id}
        name="user"
        value={user.name} 
        onChange={
          () => dispatch(setUser(user))
        }
        checked={selectedUser === user.id && true} 
      />
      <span className="user-box d-flex align-items-center">
        <span className="user-avatar" style={avatar}></span>
        <span className="user-name pl-3">{user.name}</span>
      </span>
    </label>
  )
}

UserCard.proptypes = {
  avatar: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
  selectedUser: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(UserCard)
