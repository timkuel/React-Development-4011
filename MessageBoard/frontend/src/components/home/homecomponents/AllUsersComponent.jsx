import React from 'react';

const baseURL = "/posts/users";

export class AllUsersPage extends React.Component {
    tokenType = 'Bearer';
    token = this.props.token;

    state = {
        allUsers: [],
        allDates: []
    }
    


    getAllUsers = async () => {
        const request = new Request(baseURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.tokenType + " " + this.token
            }
        });

        const response = await fetch(request);

        const returnedJson = await response.json().then(function (json) {
            return json;
        });

        var users = [];
        var dates = [];

        for(var i in returnedJson){
            users.push(returnedJson[i].username);
            dates.push(returnedJson[i].dateJoined);
        }

        
        this.setState({
            allUsers: users,
            allDates: dates
        })
    }

    componentDidMount() {
        this._isMounted = true;
        this.getAllUsers();
    }

    render() {
        return (
            <React.Fragment>
                <div>
                <ul name="username">
                    {this.state.allUsers.map((uName, index) => (
                        <div key={index} className="username">
                            <p>- Username: {uName}</p>
                            <p>- Date Joined: {this.state.allDates[index]}</p>
                            <br /><br />
                        </div>
                    ))}

                </ul>
                </div>
            </React.Fragment>
        );
    }
}