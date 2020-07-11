import React from 'react';

const baseURL = "/posts";


export class PostsPage extends React.Component {
    tokenType = 'Bearer';
    token = this.props.token;


    state = {
        allPosts: [],
        allUsers: [],
        dateTimeStamp: [],
        token: "",
        post: "",
        newPost: ""
    }

    loadPosts = async () => {
        var headers = new Headers();
        var posts = [];
        var users = [];
        var date = [];

        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.tokenType + " " + this.token
        }

        const request = new Request(baseURL, {
            method: 'GET',
            headers: headers,
        });

        const response = await fetch(request);

        const returnedJson = await response.json().then(function (json) {
            return json;
        });


        for (const i in returnedJson) {
            posts.push(returnedJson[i].content);
            users.push(returnedJson[i].username);
            date.push(returnedJson[i].date);
        }

        var newestPostFirst = [];
        var newestUserFirst = [];
        var newestDateTimeFirst = [];

        for (var i = posts.length - 1; i >= 0; i--) {
            newestPostFirst.push(posts[i]);
            newestUserFirst.push(users[i]);
            newestDateTimeFirst.push(date[i]);
        }

        this.setState({
            allPosts: newestPostFirst,
            allUsers: newestUserFirst,
            dateTimeStamp: newestDateTimeFirst
        })
    }


    createPost = async (e) => {
        var headers = new Headers();

        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.tokenType + " " + this.token
        }


        var body = {
            username: this.props.username,
            content: this.state.post
        }

        const request = new Request(baseURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        await fetch(request);

        this.setState({
            post: ""
        })

        this.loadPosts();
    }



    handlePostChange = e => { this.setState({ post: e.target.value }); }

    handleNewPost = e => { this.setState({ newPost: e.target.value }) }


    componentDidMount() {
        this._isMounted = true;
        this.loadPosts();
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-lg-8 offset-lg-2">
                    <h4>Create New Post</h4>
                </div>
                <div className="col-lg-8 offset-lg-2">
                    <div>
                        <input type="text" value={this.state.post} onChange={this.handlePostChange} />
                        <button type="submit" onClick={this.createPost}>Create Post</button>
                    </div>
                </div>
                <ul name="posts">
                    {this.state.allPosts.map((content, index) => (
                        <div key={index} className="post">
                            <p>{this.state.allUsers[index]} - {content}</p>
                            <p>{this.state.dateTimeStamp[index]}</p>
                            <br /><br />
                        </div>
                    ))}

                </ul>
            </React.Fragment>
        );
    }
}