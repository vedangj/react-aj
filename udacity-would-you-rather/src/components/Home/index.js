import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import _ from 'lodash'

import QuestionCard from './QuestionCard';

const Home = ({ questions, user }) => {
  const userHasAnswered = Object.keys(questions.all)
    .filter(i => (
      questions.all[i].optionOne.votes.includes(user.id) ||
      questions.all[i].optionTwo.votes.includes(user.id)
    ))
    .sort((a, b) => (
      questions.all[b].timestamp - questions.all[a].timestamp
    ));

  const userHasNotAnswered = Object.keys(questions.all)
    .filter(i => (
      !questions.all[i].optionOne.votes.includes(user.id) &&
      !questions.all[i].optionTwo.votes.includes(user.id)
    ))
    .sort((a, b) => (
      questions.all[b].timestamp - questions.all[a].timestamp
    ));

  const unAnsweredQuestions = _.map(userHasNotAnswered, (id, key) =>
    <QuestionCard key={key} question={questions.all[id]} userId={user.id} />
  )
  const answeredQuestions = _.map(userHasAnswered, (id, key) =>
    <QuestionCard key={key} question={questions.all[id]} userId={user.id} answered />
  )
  return (
    <div className="container-fluid">
      <h2>Unanswered Questions</h2>
      <div className="row">
        {unAnsweredQuestions}
      </div>



      <h2>Answered Questions</h2>
      <div className="row">
        {answeredQuestions}
      </div>

    </div>
  )
}


Home.propTypes = {
  questions: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
}
const mapStateToProps = state => ({
  questions: state.questions,
  user: state.users.selectedUser,
})
export default connect(mapStateToProps)(Home)
