import React, { useState } from 'react';

import { MainPage } from './homecomponents/MainComponent';
import { PostsPage } from './homecomponents/PostsComponent';
import { AllUsersPage } from './homecomponents/AllUsersComponent';

function HomePage(props) {
    const [viewingMain, setViewingMain] = useState(true);
    const [viewingPosts, setViewingPosts] = useState(false);
    const [viewingAllUsers, setViewingAllUsers] = useState(false);


    const handleLogout = async () => {
        props.setToken("");
        props.setLoggedIn(false);
    }

    const handleMainView = () => {
        setViewingMain(!viewingMain);

        if (viewingPosts)
            setViewingPosts(!viewingPosts);
        if (viewingAllUsers)
            setViewingAllUsers(!viewingAllUsers)
    }


    const handlePostsView = () => {
        setViewingPosts(!viewingPosts);

        if (viewingAllUsers)
            setViewingAllUsers(!viewingAllUsers)
        if (viewingMain)
            setViewingMain(!viewingMain);
    }


    const handleUsersView = () => {
        setViewingAllUsers(!viewingAllUsers)

        if (viewingMain)
            setViewingMain(!viewingMain);
        if (viewingPosts)
            setViewingPosts(!viewingPosts);
    }

    return (
        <React.Fragment>
            <header className="Home-header">
                <div className="buttonBar">
                    <button className="searchButtons" onClick={handleMainView}>Main</button>
                    <button className="searchButtons" onClick={handlePostsView}>Posts</button>
                    <button className="searchButtons" onClick={handleUsersView}>Users</button>
                    <button className="searchButtons" onClick={handleLogout}>Logout</button>
                </div>
                <br />
            </header>
            <div className="col-lg-8 offset-lg-2">
                {viewingMain ? (
                    <div>
                        <MainPage token={props.token} username={props.username} />
                    </div>
                ) : viewingPosts ? (

                    <div>
                        <h2>See All Posts</h2>
                        <PostsPage token={props.token} username={props.username}/>
                    </div>
                ) : viewingAllUsers ? (
                    <div>
                        <h2>All User Profile Names</h2>
                        <AllUsersPage token={props.token} username={props.username} setUsername={props.setUsername}/>
                    </div>
                ) : (
                                <div>
                                    Select a Tab
                                </div>
                            )}
            </div>

        </React.Fragment>
    )
}

export default HomePage;
// export class HomePage extends React.Component {
//     state = {
//         viewingMain: true,
//         viewingPosts: false,
//         viewingEditProfile: false
//     }


//     handleLogout = async () => {
//         this.props.setToken("");
//         this.props.setLoggedIn(false);
//     }

//     handleMainView() {
//         this.setState({ viewingMain: true });

//         if (this.state.viewingPosts)
//             this.setState({ viewingPosts: !false });
//         if (this.state.viewingEditProfile)
//             this.setState({ viewingEditProfile: false });
//     }


//     handlePostsView() {
//         this.setState({ viewingPosts: true });

//         if (this.state.viewingEditProfile)
//             this.setState({ viewingEditProfile: false });
//         if (this.state.viewingMain)
//             this.setState({ viewingMain: false });
//     }


//     handleEditProfileView() {
//         this.setState({ viewingEditProfile: true });

//         if (this.state.viewingMain)
//             this.setState({ viewingMain: false });
//         if (this.state.viewingPosts)
//             this.setState({ viewingPosts: false });
//     }


//     render() {
//         return (
//             <React.Fragment>
//                 <header className="Home-header">
//                     <div className="buttonBar">
//                         <button className="searchButtons" onClick={this.handleMainView}>Main</button>
//                         <button className="searchButtons" onClick={this.handlePostsView}>Posts</button>
//                         <button className="searchButtons" onClick={this.handleEditProfileView}>Edit Profile</button>
//                         <button className="searchButtons" onClick={this.handleLogout}>Logout</button>
//                     </div>
//                     <br />
//                 </header>
//                 <div className="col-lg-8 offset-lg-2">
//                     <h2>Home Page</h2>
//                     {this.state.viewingMain ? (
//                         <div>
//                             <h2>Main</h2>
//                             <MainPage  />
//                         </div>
//                     ) : this.state.viewingPosts ? (

//                         <div>
//                             <h2>Posts</h2>
//                             <PostsPage />
//                         </div>
//                     ) : this.state.toggleRegisterView ? (
//                         <div>
//                             <h2>Edit</h2>
//                             <EditProfilePage />
//                         </div>
//                     ) : (
//                                     <div>
//                                         Select a Tab
//                                     </div>
//                                 )}
//                 </div>

//             </React.Fragment>
//         );
//     }
// }
