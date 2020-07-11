import React from 'react';


const URL = "http://localhost:5000/createUser";



export class RegisterPage extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        // isSuccess: false,
        doesAlreadyExist: false
    }


    handleFirstname = e => { this.setState({ firstname: e.target.value }) }

    handleLastname = e => { this.setState({ lastname: e.target.value }) }

    handleUsername = e => { this.setState({ username: e.target.value }) }

    handlePassword = e => { this.setState({ password: e.target.value }) }


    handleSubmit = async () => {
        if (this.state.firstname === '') {
            alert("Firstname is required");
            return;
        }
        else if (this.state.lastname === '') {
            alert("Lastname is required");
            return;
        }
        else if (this.state.username === '') {
            alert("Username is required");
            return;
        }
        else if (this.state.password === '') {
            alert("Password is required");
            return;
        }


        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password
        };

        const request = new Request(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        fetch(request)
            .then((response) => {
                if (response.status === 201) {
                    this.setState({
                        doesAlreadyExist: false
                    });
                    this.props.setUsername(this.state.username);
                    this.props.setRegisterdStatus(true);
                }
                else {
                    alert("Username already exists!");
                    this.setState({
                        doesAlreadyExist: true,
                        isSuccess: false
                    });
                }

            })
    }


    render() {
        return (
            <React.Fragment>
                <h4 id='message'>
                    {this.state.doesAlreadExist ? (
                        <div>
                            Username already exists, try another.
                        </div>
                    ) : (
                        <div>
                            Creating a new user profile.
                        </div>
                    )}
                </h4>
                <br />
                <div>
                    <label htmlFor="firstname">Firstname: </label>
                    <input type="text" id="firstname" name="firstname" value={this.state.firstname} placeholder="Enter Firstname" onChange={this.handleFirstname} />
                    <br />
                    <label htmlFor="lastname">Lastname: </label>
                    <input type="text" id="lastname" name="lastname" value={this.state.lastname} placeholder="Enter Lastname" onChange={this.handleLastname} />
                    <br />
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" value={this.state.username} placeholder="Enter Username" onChange={this.handleUsername} />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={this.state.password} placeholder="Enter Password" onChange={this.handlePassword} />
                    <br />
                    <br />
                    <input type="submit" value="Register" onClick={this.handleSubmit} />
                    <input type="button" value="Cancel" />
                </div>
            </React.Fragment>
        );
    }
}