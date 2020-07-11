import React from 'react';


const userURL = "/readUser/";
const postURL = "/posts";

export class MainPage extends React.Component {
    tokenType = 'Bearer';
    token = this.props.token;
    username = this.props.username;
    dateTime = new Date().toLocaleString().split(',');
    
    date = this.dateTime[0];
    time = this.dateTime[1];
    

    state = {
        firstname: "",
        lastname: "",
        post: "",
        userPosts: [],
        dateTimeStamp: []
    }


    getUserInfo = async () => {
        const request = new Request(userURL + this.props.username, {
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

        this.setState({
            firstname: returnedJson[0].firstname,
            lastname: returnedJson[0].lastname
        })
    }


    loadUserPosts = async () => {
        var headers = new Headers();
        var posts = [];
        var timeStamp = [];

        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.tokenType + " " + this.token
        }

        const request = new Request(postURL + "/" + this.username, {
            method: 'GET',
            headers: headers,
        });

        const response = await fetch(request);

        const returnedJson = await response.json().then(function (json) {
            return json;
        });

        for (const i in returnedJson) {
            posts.push(returnedJson[i].content);
            timeStamp.push(returnedJson[i].date);
        }

        var newestPostFirst = [];
        var newestTimeFirst = [];

        for(var i = posts.length - 1; i >= 0; i--) {
            newestPostFirst.push(posts[i]);
            newestTimeFirst.push(timeStamp[i]);
        }

        this.setState({ 
            userPosts: newestPostFirst,
            dateTimeStamp: newestTimeFirst
         })
    }

    createPost = async (e) => {
        var headers = new Headers();

        console.log("props", this.props)


        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.tokenType + " " + this.token
        }


        var body = {
            username: this.props.username,
            content: this.state.post
        }

        const request = new Request(postURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        const response = await fetch(request);

        console.log('res', response);

        this.setState({
            post: ""
        })

        this.loadUserPosts();
    }

    updatePost = async (index) => {
        var headers = new Headers();

        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.tokenType + " " + this.token
        }

        var body = {
            username: this.props.username,
            newContent: this.state.newPost,
            oldContent: this.state.userPosts[index],
        }

        const request = new Request(postURL, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        });

        await fetch(request);

        document.getElementById(index).value = "";
        this.loadUserPosts();
    }

    deletePost = async (index) => {
        var headers = new Headers();

        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.tokenType + " " + this.token
        }

        var body = {
            username: this.props.username,
            content: this.state.userPosts[index]
        }

        const request = new Request(postURL, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(body)
        });

        await fetch(request);

        this.loadUserPosts();
    }


    componentDidMount() {
        this._isMounted = true;
        this.getUserInfo();
        this.loadUserPosts();
    }

    handlePostChange = e => { this.setState({post: e.target.value}); }

    handleNewPost = e => { this.setState({ newPost: e.target.value }) }


    render() {
        return (
            <React.Fragment>
                <div className="col-lg-8 offset-lg-2">
                    <h2>Welcome Back {this.username} </h2>
                    <h4>The current date is {this.date} and the current time is {this.time}</h4>
                </div>
                <br />
                <div id="profileInformation" >
                    Profile Information
                    <div id='firstname'>Firstname: {this.state.firstname}</div>
                    <div id='lastname'>Lastname: {this.state.lastname}</div>
                    
                </div>
                <div id="newPost">
                    <h4>Create New Post</h4>
                    <div>
                        <input type="text" value={this.state.post} onChange={this.handlePostChange} />
                        <button type="submit" onClick={this.createPost}>Create Post</button>
                    </div>
                </div>
                <h4>All Posts From {this.username}</h4>
                <ul name="posts">
                    {this.state.userPosts.map((content, index) => (
                        <div key={index} className="post">
                            <p>{this.username} - {content}</p>
                            <p>{this.state.dateTimeStamp[index]}</p>
                            <button onClick={() => this.deletePost(index)}>Delete</button>
                            <br></br>
                            <button onClick={() => this.updatePost(index)}>Update</button>
                            <input id={index} type="text" onChange={this.handleNewPost} />
                            <br /><br />
                        </div>
                    ))}

                </ul>
            </React.Fragment>
        );
    }
}