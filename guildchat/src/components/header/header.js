import React, { Component } from 'react';
import './header.css';

class Header extends Component {

  constructor(props){
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);       
  }

  handleColorChange(event) {
    /* Since no chat app in the history of the internet has been created without its users squabbling over whether light or dark mode is better...
    ... it seemed only fair to provide the choice. */

    const color = event.target.value;
    this.props.onColorChange(color);
  }

  render() {
    return (
        <header className="header">
            <h1 className="header__title">Welcome to GuildChat!</h1>

            <div className="header__toggle">
              <select onChange={this.handleColorChange}>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>
        </header>
    );
  }
}

export default Header;