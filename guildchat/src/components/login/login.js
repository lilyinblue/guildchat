import React, { Component } from 'react';
import './login.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.handleUserChange = this.handleUserChange.bind(this); 
    }

    handleUserChange(e) {
        const current = parseInt(e.target.value);

        //This is a hacky/hardcoded part in which we automatically select the other guy as our target since there's only two users.
        //In a more robust, multi-user solution, we would need an option to select who you want to talk to.
        const target = (current === 1) ? 2 : 1;

        if (current >= 1) { //The if statement is to catch cases in which a user somehow selects the blank option in the dropdown
            
            const currentObj = this.props.chatData.find(x => x.id === current);
            const targetObj = this.props.chatData.find(x => x.id === target);

            this.props.onChange(currentObj, targetObj);
        }
        
    }

    render() {
        if (this.props.isLoggedIn) return null;
        return (
            <div className="login">
                <label htmlFor="users">Please select a user:</label>
                <select id="users" name="users" className="login__select" onChange={this.handleUserChange}>
                    <option></option>
                    <option value="1">Mario</option>
                    <option value="2">Luigi</option>
                </select>
            </div>
        );
    }
}

export default Login;