import React, { Component } from 'react';
import './bubble.css';

class Bubble extends Component {
    
    renderName() {
        //This functions determines which name to display in front of the message, leveraging the 'from' property in the data.
        //A 'to' property is also included in the data, but not leveraged.  If more than two users existed, it would be necessary.
        const from = parseInt(this.props.msg.from);
        const currentId = parseInt(this.props.currentUser.id);

        if(from === currentId) {
            return (<span className="bubble__name">You</span>);
        } else {
            return (<span className="bubble__name">{this.props.targetUser.name}</span>);
        }
    }
 
    render() {
        return (
            <div className="bubble">
                {this.renderName()}
                <span className="bubble__time">{this.props.msg.time}</span>
                <span className="bubble__text">{this.props.msg.content}</span>
            </div>            
        );
    }
  
}

export default Bubble;