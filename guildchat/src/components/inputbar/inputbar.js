import React, { Component } from 'react';
import './inputbar.css';

class Inputbar extends Component {
  constructor(props){
    super(props);
    this.state = {msg: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({msg: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.msg);
    this.setState({msg: ""})
  }

  render() {
    return (
        <div className="inputbar">
            <form onSubmit={this.handleSubmit}>
              <input className="inputbar__input" type="text" placeholder="Type here..." value={this.state.msg} onChange={this.handleChange} />
              <button className="inputbar__btn" type="submit">Send</button>
            </form>            
        </div>
    );
  }
}

export default Inputbar;