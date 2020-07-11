import React from 'react';


const URL = "/tokens";



export class LoginPage extends React.Component {
    state = {
        username: this.props.username,
        password: "",
        token: "",
    }

    handleUsername = e => { this.setState({ username: e.target.value }) }

    handlePassword = e => { this.setState({ password: e.target.value }) }


    handleSubmit = async () => {
        if (this.state.username === '') {
            alert("Username is required");
            return;
        }
        else if (this.state.password === '') {
            alert("Password is required");
            return;
        }


        const login = {
            username: this.state.username,
            password: this.state.password
        };

        const request = new Request(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login),
        });

        const response = await fetch(request);

        const returnedToken = await response.json().then(function (json) {
            return json.token;
        });

        this.setState({
            token: returnedToken
        });


        if(response.status === 201) {
            this.props.setUsername(this.state.username);
            this.props.setToken(this.state.token);
            this.props.setLoggedIn(true);
        }
        else{
            alert("Username or Password Incorrect!")
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" value={this.state.username} placeholder="Enter Username" onChange={this.handleUsername} />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={this.state.password} placeholder="Enter Password" onChange={this.handlePassword} />
                    <br />
                    <br />
                    <input type="submit" value="Login" onClick={this.handleSubmit} />
                </div>
            </React.Fragment>
        );
    }
}