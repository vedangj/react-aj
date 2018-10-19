import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { handleSaveQuestionAnswer } from "../actions/common";

class DetailQuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOption: ""
    };
    this.optionSelected = this.optionSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  optionSelected(e) {
    this.setState({
      selectOption: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.handleSaveQuestionAnswer(id, this.state.selectOption);
  }
  render() {
    const {
      question,
      questionAuthor,
      isAnswered,
      isOptionOneAnswered
    } = this.props;
    const { selectOption } = this.state;

    if (!question) {
      return <Redirect to="/404" />;
    }

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const percentageOptionOne = (optionOneVotes /
      (optionOneVotes + optionTwoVotes) *
      100).toFixed(2);
    const percentageOptionTwo = (optionTwoVotes /
      (optionOneVotes + optionTwoVotes) *
      100).toFixed(2);

    return (
      <div>
        <div className="row" style={{ marginTop: "60px" }}>
          <div className="col-lg-8 offset-lg-2">
            {isAnswered ? (
              <div className="card" style={{ marginBottom: "20px" }}>
                <div>
                  <h5 className="card-header">Question Details  </h5>
                  <div
                    style={{
                      paddingRight: "25px",
                      paddingTop: "25px",
                      paddingLeft: "25px"
                    }}
                  >
                    <div style={{ marginBottom: "50px" }}>
                      <img
                        src={questionAuthor.avatarURL}
                        className="card-img-top"
                        style={{ height: "250px", width: "250px" }}
                        alt={`Avatar of ${questionAuthor.name}`}
                      />
                      <span style={{ fontSize: "25px", marginLeft: "25px" }}>
                        <b>Author: {questionAuthor.name}</b>
                      </span>
                    </div>
                    {question.optionOne.text}{" "}
                    {isOptionOneAnswered ? (
                      <span style={{ marginLeft: "25px" }}>
                        &#x2705; (your answer)
                      </span>
                    ) : null}
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentageOptionOne}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax={percentageOptionOne}
                      />
                    </div>
                    ({optionOneVotes} vote(s)| {percentageOptionOne}%)
                  </div>
                  <div
                    style={{
                      paddingRight: "25px",
                      paddingTop: "25px",
                      paddingLeft: "25px",
                      paddingBottom: "25px"
                    }}
                  >
                    {question.optionTwo.text}{" "}
                    {!isOptionOneAnswered ? (
                      <span style={{ marginLeft: "25px" }}>
                        &#x2705; (your answer)
                      </span>
                    ) : null}
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentageOptionTwo}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax={percentageOptionTwo}
                      />
                    </div>
                    ({optionTwoVotes} vote(s) | {percentageOptionTwo}%)
                  </div>
                  <button
                    style={{ marginBottom: "25px", marginLeft: "25px" }}
                    onClick={() => {
                      this.props.history.push("/");
                    }}
                    className="btn btn-outline-success btn-lg"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <div className="card" style={{ marginBottom: "20px" }}>
                  <div>
                    <h5 className="card-header">
                      Select your option and submit {" "}
                    </h5>
                    <div
                      style={{
                        paddingRight: "25px",
                        paddingTop: "25px",
                        paddingLeft: "25px"
                      }}
                    >
                      <div style={{ marginBottom: "50px" }}>
                        <img
                          src={questionAuthor.avatarURL}
                          className="card-img-top"
                          style={{ height: "250px", width: "250px" }}
                          alt={`Avatar of ${questionAuthor.name}`}
                        />
                        <span style={{ fontSize: "25px", marginLeft: "25px" }}>
                          <b>Author: {questionAuthor.name}</b>
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="radio1"
                        value="optionOne"
                        onChange={this.optionSelected}
                      />{" "}
                      {question.optionOne.text}
                    </div>
                    <div
                      style={{
                        paddingRight: "25px",
                        paddingTop: "25px",
                        paddingLeft: "25px",
                        paddingBottom: "25px"
                      }}
                    >
                      <input
                        type="radio"
                        name="radio1"
                        value="optionTwo"
                        onChange={this.optionSelected}
                      />{" "}
                      {question.optionTwo.text}
                    </div>
                    <button
                      style={{ marginBottom: "25px", marginLeft: "25px" }}
                      onClick={() => {}}
                      className="btn btn-outline-success btn-lg"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, users, loginUser }, props) => {
  const { id } = props.match.params;
  const question = questions[id];
  const questionAuthor = users[question.author];
  const isOptionOneAnswered = question.optionOne.votes.includes(loginUser);
  const isOptionTwoAnswered = question.optionTwo.votes.includes(loginUser);
  const isAnswered = isOptionOneAnswered || isOptionTwoAnswered;
  return {
    question,
    questionAuthor,
    isAnswered,
    isOptionOneAnswered
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleSaveQuestionAnswer
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailQuestionPage)
);
