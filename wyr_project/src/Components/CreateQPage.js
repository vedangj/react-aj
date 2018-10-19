import React, {Component} from 'react'
import { Route , withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import loadingImg from '../img/loading.gif'
import {_saveQuestion} from '../_DATA'
import { bindActionCreators } from 'redux'
import { handleQuestion} from '../actions/common'

class CreateQPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      fquestion: "",
      squestion: "",
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

onChangeField(e, name){
  this.setState({
    [name]: e.target.value
  })
}

onFormSubmit(e) {
  e.preventDefault()
  const { fquestion, squestion } = this.state
    this.props.handleQuestion(fquestion, squestion)
    this.props.history.push('/')
}

render(){

  return(
       this.props.loading === true ? <img style={{ marginLeft: "45vw", marginTop: "35vh", width: "150px", height: "150px"}} src={loadingImg} />  :
     <div>


<div className="row" style={{ marginTop: "60px"}}>
  <div className="col-lg-8 offset-lg-2">
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item">Add a Question</li>
  </ol>
</nav>

 <div className="card" style={{ marginBottom: "20px"}} >
      <div className="card-body">
        <form onSubmit={this.onFormSubmit}>
  <div className="row">
    <div className="col">
      <input name="fqestion" value={this.state.fquestion} onChange={(e) => this.onChangeField(e, 'fquestion')} className="form-control" placeholder="First Answer"/>
    </div>
    <div className="col">
      <input name="sqestion" value={this.state.squestion} onChange={(e) =>this.onChangeField(e, 'squestion')} className="form-control" placeholder="Second Answer"/>
    </div>
  </div>
  <button style={{ marginTop: "35px"}} className="btn btn-outline-default btn-md">Cancel</button>
  <button style={{ marginTop: "35px"}} className="btn btn-outline-success btn-md">Create</button>
</form>
      </div>
    </div>

</div>
</div>

</div>
  );
}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
   handleQuestion 
  }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(CreateQPage));