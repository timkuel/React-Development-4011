import React, { useState } from 'react';

import { LoginPage } from './components/login/LoginComponent';
import { RegisterPage } from './components/register/RegisterComponent';
import HomePage from './components/home/HomeView';

function App() {
  const [toggleLoginView, setToggleLoginView] = useState(true);
  const [toggleRegisterView, setToggleRegisterView] = useState(false);

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSuccessfullyRegisterd, setRegisterdStatus] = useState(false);

  const handleLoginView = () => {
    setToggleLoginView(!toggleLoginView);

    if (toggleRegisterView)
      setToggleRegisterView(!toggleRegisterView);
  }

  const handleRegisterView = () => {
    setToggleRegisterView(!toggleRegisterView);


    if (toggleLoginView)
      setToggleLoginView(!toggleLoginView);
    if (isSuccessfullyRegisterd)
      setRegisterdStatus(!isSuccessfullyRegisterd);
  }


  return (
    <div className="App">
      <br />
      {isLoggedIn ? (
        <div>
          <HomePage setToken={setToken} setLoggedIn={setLoggedIn} token={token} username={username} setUsername={username}/>
        </div>
      ) : toggleLoginView || isSuccessfullyRegisterd ? (

        <div>
          <header className="App-header">
            <div className="buttonBar">
              <button className="searchButtons" onClick={handleLoginView}>LogIn</button>
              <button className="searchButtons" onClick={handleRegisterView}>Register</button>
            </div>
            <br />
          </header>
          <h2>Login</h2>
          <LoginPage setToken={setToken} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />
          <div>{token}</div>
        </div>
      ) : toggleRegisterView ? (
        <div>
          <header className="App-header">
            <div className="buttonBar">
              <button className="searchButtons" onClick={handleLoginView}>LogIn</button>
              <button className="searchButtons" onClick={handleRegisterView}>Register</button>
            </div>
            <br />
          </header>
          <h2>Register</h2>
          <RegisterPage setRegisterdStatus={setRegisterdStatus} setUsername={setUsername} />
        </div>
      ) : (
              <div>
                <header className="App-header">
                  <div className="buttonBar">
                    <button className="searchButtons" onClick={handleLoginView}>LogIn</button>
                    <button className="searchButtons" onClick={handleRegisterView}>Register</button>
                  </div>
                  <br />
                </header>
                Select a Tab
              </div>
            )}
      <br />
    </div>
  )
}

export default App;