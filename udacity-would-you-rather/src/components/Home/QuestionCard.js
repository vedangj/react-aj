import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { registerVote } from '../../actions/questions';

const QuestionCard = ({ question, users, userId, registerVote }) => {
  const optionOneVoteUser = _.map(question.optionOne.votes, (user, i) => 
    <span className="badge" key={i}>{users[user].name}</span>
  )
  const optionTwoVoteUser = _.map(question.optionTwo.votes, (user, i) => 
  <span className="badge" key={i}>{users[user].name}</span>
)
  return (
    <div className="col-sm-4">
      <div className="card border-secondary mb-4">
        <div className="card-header">
          <div className="user-info">
            <div className="user-avatar" style={{ backgroundImage: `url('${users[question.author].avatarURL}')` }} />
            <div className="user-name">
              {users[question.author].name}
              <time>{moment(question.timestamp).format("MMMM Do, YYYY")}</time>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5>Questions: <small>Please select your answer</small></h5>
          <div className="questions">
            <div className="question-option">
              <input 
                name={question.id}
                type="radio"
                value={question.optionOne.text}
                checked={question.optionOne.votes.includes(userId)}
                id={`optionOne_${question.id}`}
                onChange={() => registerVote({authedUser:userId, qid: question.id, answer: 'optionOne'})}
              />
              <label htmlFor={`optionOne_${question.id}`}>
                  <div className="question-text">
                    {question.optionOne.text}
                  </div>
                  {
                    !_.isEmpty(question.optionOne.votes) &&
                    <div className="vote-by">
                      {optionOneVoteUser}
                    </div>
                  }
              </label>
            </div>
            <div className="question-option">
              <input 
                name={question.id}
                type="radio"
                value={question.optionTwo.text}
                checked={question.optionTwo.votes.includes(userId)}
                id={`optionTwo_${question.id}`}
                onChange={() => registerVote({authedUser:userId, qid: question.id, answer: 'optionTwo'})}
              />
              <label htmlFor={`optionTwo_${question.id}`}>
                <div className="question-text">
                  {question.optionTwo.text}
                </div>
                {
                  !_.isEmpty(question.optionTwo.votes) &&
                  <div className="vote-by">
                    {optionTwoVoteUser}
                  </div>
                }
              </label>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

QuestionCard.propTypes = {
  question: PropTypes.shape({}).isRequired,
  users: PropTypes.shape({}).isRequired,
  userId: PropTypes.string,
  registerVote: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  questions: state.questions,
  users: state.users.all,
})
export default connect(mapStateToProps, { registerVote })(QuestionCard)


