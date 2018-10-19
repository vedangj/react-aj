import React, { Component } from 'react';
import { connect } from 'react-redux'
import loadingImg from '../img/loading.gif'

class LeaderBoardPage extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render() {
        return (
            this.props.loading === true ? <img style={{ marginLeft: "45vw", marginTop: "35vh", width: "150px", height: "150px"}} src={loadingImg} />  : (
        <div>

          

            <div className="row" style={{ marginTop: "60px"}}>
            <div className="col-lg-8 offset-lg-2">
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">Leaderboard</li>
            </ol>
            </nav>

            <table className="table table-dark table-striped">
    <thead>
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>Questions Created</th>
        <th>Questions Answered</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
        {
            this.props.leader.map((user, index) => (
            <tr key={user.id}>
        <td>{index + 1}</td>
        <td> <img style={{height: "60px", width: "60px", borderRadius: "50%", marginLeft: "15px", marginRight: "15px" }} 
    src={user.avatarURL ? user.avatarURL : '/img/default-user.png' } alt='Card image cap'/>
{user.name}</td>
        <td>{user.created}</td>
        <td>{user.answered}</td>
        <td>{ user.created + user.answered}</td>
      </tr>
        )) 
        
        } 
        
      
  
    </tbody>
  </table>

        </div>
</div>





            </div> )
        );
    }
}

const mapStateToProps = ({ users }) => {
    const leader = Object.keys(users).map(id => ({
    id,
    created : users[id].questions.length,
    answered: Object.keys(users[id].answers).length,
    name: users[id].name,
    avatarURL: users[id].avatarURL
  })).sort((a, b) =>  b.created + b.answered - (a.created + a.answered))
  return {
    leader
  }
}

export default connect(mapStateToProps)(LeaderBoardPage);