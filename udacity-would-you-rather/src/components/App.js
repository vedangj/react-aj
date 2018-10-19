import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import LoadingBar from 'react-redux-loading-bar';

import { getUsers } from '../actions/users';
import { getQuestions } from '../actions/questions';

import Login from './Auth/Login';

import Header from './common/Header';
import Home from './Home';
import AddQuestion from './AddQuestion';
import LeadBoard from './LeadBoard';

class App extends Component {
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }
  
  render () {
    const { auth, loadingBar } = this.props;
    return (
      <Fragment>
        <LoadingBar style={{ backgroundColor: '#f44336', height: '5px' }} />
        {auth.id && <Header />}
        {
          loadingBar.default === 0 &&
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute path="/addquestion" component={AddQuestion} />
            <PrivateRoute path="/leadboard" component={LeadBoard}/>
            
            <Route exact path="/login" component={Login}/>
            <Route path="/" component={Login}/>
        </Switch>
        }
      </Fragment>
    )
  }
}

App.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  loadingBar: PropTypes.shape({}).isRequired,
}
const mapStateToProps = state => ({ auth: state.auth, loadingBar: state.loadingBar })
export default withRouter(connect(mapStateToProps, { getUsers, getQuestions })(App))
