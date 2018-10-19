import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Header = ({user, logout}) => (
  <header className="header mb-4">
    <h1 className="logo">Would you rather</h1>
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/addquestion">Add question</NavLink>
      <NavLink exact to="/leadboard">Leadboard</NavLink>
    </nav>
    <div className="user-meta">
      <div className="user-details">
        <span className="user-name pl-3">Hello, {user ? user.name : 'Guest'}</span>
        <span
          className="user-avatar" 
          style={{
            backgroundImage: `url('${user.avatarURL}')`
          }}
        />
      </div>
      <div className="auth">
        <button onClick={() => logout()} className="btn btn-outline-primary">Logout</button>
      </div>
    </div>
  </header>
);


Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
}

const mapStateToProps = state => ({
  user: state.users.selectedUser
})

export default connect(mapStateToProps, { logout })(Header);
