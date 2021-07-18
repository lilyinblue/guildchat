import React, { Component } from 'react';
import './chat.css';
import History from '../history/history';
import Inputbar from '../inputbar/inputbar';

class Chat extends Component {
    render() {
        if (!this.props.isLoggedIn) return null;
        return (
            <div className="chat">
                <h2 className="chat__title">You are: <strong>{this.props.currentUser.name}</strong></h2>
                <History msgData={this.props.chatData.messages} currentUser={this.props.currentUser} targetUser={this.props.targetUser} />
                <Inputbar onSubmit={this.props.onSubmit} />
            </div>            
        );
    }
  
}

export default Chat;