import React, { Component } from "react";
import TimeAgo from "react-timeago";
import loadingImg from "../img/loading.gif";
import  {withRouter} from "react-router-dom"
// var unAnsweredQuestions = []
// var unAnswer=[]
// var answer = []

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabAnswered: true
    };
    this.toogleTab = this.toogleTab.bind(this)
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails (e, id) {
    e.preventDefault()
    this.props.history.push(`/question/${id}`)
  }

  toogleTab() {
    this.setState({
      tabAnswered: !this.state.tabAnswered
    });
  }

  render() {
    console.log(this.props);
    return this.props.loading === true ? (
      <img
        style={{
          marginLeft: "45vw",
          marginTop: "35vh",
          width: "150px",
          height: "150px"
        }}
        alt="Loading..."
        src={loadingImg}
      />
    ) : (
      <div>
        <div className="row" style={{ marginTop: "60px" }}>
          <div className="col-lg-8 offset-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li
                  className={
                    "breadcrumb-item " +
                    (this.state.tabAnswered === true ? "active" : "")
                  }
                  onClick={this.toogleTab}
                >
                  <a>Unanswered</a>
                </li>
                <li
                  className={
                    "breadcrumb-item " +
                    (this.state.tabAnswered === false ? "active" : "")
                  }
                  onClick={this.toogleTab}
                >
                  <a>Answered</a>
                </li>
              </ol>
            </nav>

            {this.state.tabAnswered === false &&
            this.props.usersResponses !== null ? (
              Object.keys(this.props.usersResponses[0].answers)
                .sort(
                  (a, b) =>
                    this.props.questions[b].timestamp -
                    this.props.questions[a].timestamp
                )
                .map(aq => this.props.questions[aq])
                .map(question => (
                  <div
                    className="card"
                    style={{ marginBottom: "20px" }}
                    key={question.id}
                  >
                    <div>
                      <h5 className="card-header" style={{ margin: "0px" }}>
                        {question.author} asks {" "}
                        <TimeAgo date={new Date(question.timestamp)} />{" "}
                      </h5>
                      <div
                        style={{
                          paddingRight: "25px",
                          paddingTop: "25px",
                          paddingLeft: "25px",
                          paddingBottom: "25px"
                        }}
                      >
                        {question.optionOne.text}{" "}
                        {question.optionOne.votes
                          .filter(a => a === this.props.selectUser)
                          .map(q => <span>&#x2705;</span>)}
                      </div>
                      <div
                        style={{
                          paddingRight: "25px",
                          paddingTop: "25px",
                          paddingLeft: "25px",
                          paddingBottom: "25px"
                        }}
                        title={question.optionTwo.votes}
                      >
                        {question.optionTwo.text}{" "}
                        {question.optionTwo.votes
                          .filter(a => a === this.props.selectUser)
                          .map(q => <span>&#x2705;</span>)}
                      </div>
                      <button
                        style={{ marginBottom: "25px", marginLeft: "25px" }}
                        onClick={(e) => {this.getDetails(e, question.id)}}
                        className="btn btn-outline-success btn-lg"
                      >
                        See +
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              ""
            )}

            {this.state.tabAnswered === true &&
            this.props.usersResponses !== null ? (
              Object.keys(this.props.questions)
                .sort(
                  (a, b) =>
                    this.props.questions[b].timestamp -
                    this.props.questions[a].timestamp
                )
                .filter(
                  ak =>
                    (ak = !Object.keys(this.props.usersResponses[0].answers)
                      .sort(
                        (a, b) =>
                          this.props.questions[b].timestamp -
                          this.props.questions[a].timestamp
                      )
                      .map(aq => this.props.questions[aq])
                      .map(ak => ak.id)
                      .includes(ak))
                )
                .map(ua => this.props.questions[ua])
                .map(ua => (
                  <div
                    className="card"
                    style={{ marginBottom: "20px" }}
                    key={ua.id}
                  >
                    <div>
                      <h5 className="card-header">
                        {ua.author} asks {" "}
                        <TimeAgo date={new Date(ua.timestamp)} />{" "}
                      </h5>
                      <div
                        style={{
                          paddingRight: "25px",
                          paddingTop: "25px",
                          paddingLeft: "25px"
                        }}
                      >
                        {ua.optionOne.text}
                      </div>
                      <div
                        style={{
                          paddingRight: "25px",
                          paddingTop: "25px",
                          paddingLeft: "25px",
                          paddingBottom: "25px"
                        }}
                      >
                        {ua.optionTwo.text}
                      </div>
                      <button
                        style={{ marginBottom: "25px", marginLeft: "25px" }}
                        onClick={(e) => { this.getDetails(e, ua.id)}}
                        className="btn btn-outline-success btn-lg"
                      >
                        See +
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default  withRouter(HomePage)