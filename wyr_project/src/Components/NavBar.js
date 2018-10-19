import React from 'react'
import { NavLink, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

const NavBar = (props) => (
 <div>
    {props.loginUser !== null ? (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand" to="/">WouldYouRather</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item" >
        <NavLink exact className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/leaderboard">Leader board</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/addquestion">Add a question</NavLink>
      </li>
    </ul>
    <div className="ml-auto">
    <span className="navbar-text ml-auto" style={{color: "white", marginRight: "20px"}}>Welcome 
     
      <img style={{height: "60px", width: "60px", borderRadius: "50%", marginLeft: "15px", marginRight: "15px" }} 
    src={props.selectIcon ? props.selectIcon : '/img/default-user.png' } alt='Card image cap'/>

        {props.loginUser}</span>
     <button onClick={ props.onUserLogout
       }  className="btn-outline-danger navbar-text" style={{color: "white"}}>
         
     Log Out

    </button>
    </div>
    </div>
    </nav>
    ) 
    :
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">WouldYouRather</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <div className="ml-auto">
     <button onClick={ () => { 
        props.history.push('/')
       }  } className="btn-outline-danger navbar-text" style={{color: "white"}}>
         
     Login

    </button>
    </div>
    </div>
    </nav>
    
    }
  
 </div>

)


const mapStateToProps = state => {
  return {
     loginUser: state.loginUser
  }
}



export default withRouter(NavBar)