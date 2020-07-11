import React, { useState } from 'react';
import './App.css';
import { CharacterList } from './Components/CharacterComponents';
import { FilmList} from './Components/FilmComponents';
import { PlanetList } from './Components/PlanetComponents';


function App() {
  const [toggleCharacterView, setToggleCharacterView] = useState(false);
  const [toggleFilmView, setToggleFilmView] = useState(false);
  const [togglePlanetView, setTogglePlanetView] = useState(false);

  const handleCharacterView = () => {
    setToggleCharacterView(!toggleCharacterView);

    /* Untoggling the Film and Planet views if selected */
    if(toggleFilmView)
      setToggleFilmView(!toggleFilmView);
    
    if(togglePlanetView)
      setTogglePlanetView(!togglePlanetView);

  }
  
  const handleFilmView = () => {
    setToggleFilmView(!toggleFilmView);

    /* Untoggling the Character and Planet views if selected */
    if(toggleCharacterView)
      setToggleCharacterView(!toggleCharacterView);
    
    if(togglePlanetView)
      setTogglePlanetView(!togglePlanetView);
  }

  const handlePlanetView = () => {
    setTogglePlanetView(!togglePlanetView);

    /* Untoggling the Character and Film views if selected */
    if(toggleCharacterView)
      setToggleCharacterView(!toggleCharacterView);

    if(toggleFilmView)
      setToggleFilmView(!toggleFilmView);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="buttonBar">
          <button className="searchButtons" onClick={handleCharacterView}>Characters</button>
          <button className="searchButtons" onClick={handleFilmView}>Films</button> 
          <button className="searchButtons" onClick={handlePlanetView}>Planets</button> 
        </div>
        <br />
        <img className='logo' src={require('./images/StarWarsLogo.png')} alt="Star Wars Logo" />
        <br />
        {toggleCharacterView ? (
          <div>
            <CharacterList />
          </div>
        ) : toggleFilmView ? (
          <div>
            <FilmList />
          </div>
        ) : togglePlanetView ? (
          <div>
            <PlanetList />
          </div>
        ) : (
          <div>Please Select A Tab</div>
        )}
        <br />
      </header>
    </div>
  );
}


export default App;