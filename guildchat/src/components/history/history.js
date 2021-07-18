import React, { Component } from 'react';
import './history.css';
import Bubble from '../bubble/bubble';

class History extends Component {
  render() {
    return (
        <div className="history">
            <div className="history__scroll">
              {
                this.props.msgData.map((msg) => {
                  //Note: For the purposes of this, the timestamp on each message is being used as its unique key.
                  //In a large-scale solution, a genuine unique key would need to be generated as it is possible two messages could be submitted at the same milisecond.
                  return <Bubble msg={msg} key={msg.time} currentUser={this.props.currentUser} targetUser={this.props.targetUser} />
                })
              }
            </div>
        </div>
    );
  }
}

export default History;