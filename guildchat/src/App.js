
import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Login from './components/login/login';
import Chat from './components/chat/chat';


class App extends Component {
  constructor(props){
      super(props);

      this.changeUser = this.changeUser.bind(this);
      this.setColor = this.setColor.bind(this);
      this.getData = this.getData.bind(this);
      this.appendData = this.appendData.bind(this);
      this.sendData = this.sendData.bind(this);
      this.refreshData = this.refreshData.bind(this);
      
      this.state = {
          color: "light",
          isLoggedIn: false,
          currentUser: {},
          targetUser: {},
          chatData: {}
      }      
  }    

  componentDidMount() {
    this.getData();   
  }
  
  getData() {
    fetch('http://localhost:8080/read')
      .then(response => response.json())
      .then(data => this.setState({chatData: data}));
  }

  appendData(newMsg) {
    //Assembling a new set of chat data appended with the latest message in preparation to overwrite the exising json file.
    let chatData = this.state.chatData;
    let msgObj = {};
    let time = new Date();

    msgObj.to = this.state.targetUser.id;
    msgObj.from = this.state.currentUser.id;
    msgObj.time = time.toString();
    msgObj.content = newMsg;

    chatData.messages.push(msgObj);
    this.sendData(chatData);
  }

  sendData(chatData) {
    fetch('http://localhost:8080/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
  }

  refreshData() {
    //Checking the json file storing the chat data for updates once per second.
    const getData = this.getData.bind(this);
    setInterval(getData, 1000);
  }

  changeUser(current, target){
    this.setState({
      isLoggedIn: true,
      currentUser: current,
      targetUser: target
    })

    this.refreshData(); //We wait until a user has been selected to begin refreshing the chat data, else it would be pointlessly processing in the background.
  }

  setColor(color) {
    // Handler for the light/dark mode toggle.
    this.setState({ color: color})
  }

  render() {
      return (
        <div className={`App ${this.state.color}`}>
        <Header onColorChange={this.setColor} />
        <div className="App__content">   
          <Login isLoggedIn={this.state.isLoggedIn} onChange={this.changeUser} chatData={this.state.chatData.users} />
          <Chat isLoggedIn={this.state.isLoggedIn} onSubmit={this.appendData} currentUser={this.state.currentUser} targetUser={this.state.targetUser} chatData={this.state.chatData} />
        </div>
      </div>          
      );
  }
}

export default App;
