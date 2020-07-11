import React, { useState, useEffect } from "react";
import Collapsible from 'react-collapsible'
import './Components.css';


export const CharacterList = props => {
    const startingCharacters = [];
    const startingURL = [`https://swapi.co/api/people/`];
    

    // Hooks
    const [allCharacters, setAllCharacters] = useState(startingCharacters);
    const [searchTerm, setSearchTerm] = useState("");
    const [characters, setCharacters] = useState(startingCharacters);
    const [loadStatement, setLoadStatement] = useState("");
    
    
    // Boolean hook for loading bar
    const [isLoading, setIsLoading] = useState(false);
 

    const callWithFetch = async () => {
        // Setting loading to true
        setIsLoading(true);
        setLoadStatement("Loading Characters...");

        let charArr = [];
        let nextURL = startingURL;

        while(nextURL != null){
            let urls = [`${nextURL}`];

            const subCharacterArrays = urls.map(async url => {
                const response = await fetch(url);
                const json = await response.json();
                const allCharacters = json.results;
                
                // Next page information if there
                nextURL = json.next;
        
                return allCharacters;
            });
    
            const awaitedThings = await Promise.all(subCharacterArrays);
            const allCharacters = awaitedThings.flat();
            charArr.push(allCharacters);
        }


        let tempArr = charArr.flat()

        // Updating the list to display character info
        setCharacters(tempArr);
        setAllCharacters(tempArr);

        setLoadStatement("Loading Character Homeworlds...");

        // Replacing the homeworld character info
        for(var i = 0; i < tempArr.length; i++){
            const response = await fetch(tempArr[i].homeworld);
            const json = await response.json();
            tempArr[i].homeworld = json.name;
        }

        // Updating the homeworld character info
        setCharacters(tempArr);
        setAllCharacters(tempArr);

        setLoadStatement("Loading Character Films...");

        // Replacing the films character info
        for(i = 0; i < tempArr.length; i++){
            for(var j = 0; j < tempArr[i].films.length; j++){
                const response = await fetch(tempArr[i].films[j]);
                const json = await response.json();
                tempArr[i].films[j] = json.title;
            }
        }
        
        // Final update of the character list
        setLoadStatement("Done");
        setAllCharacters(charArr.flat());
        setCharacters(charArr.flat());
        setIsLoading(false);
    };


    useEffect(() => {
       if(allCharacters.length === 0)
            callWithFetch();
    });
    

    useEffect(() => {
        document.title = `Showing ${characters.length} characters`;
    });
      

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setCharacters(allCharacters.filter(character => character.name.toString().toLowerCase().includes(event.target.value.toLowerCase())));
    };


    const LoadingBarDisplay = () => {
        return <> {isLoading && <p>{loadStatement}</p>} </>;
    };


    return(
        <React.Fragment>
            <div>
                <h1>Characters</h1>
                <h6>Search through the Characters</h6>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search By Character" />
                <br />
                <LoadingBarDisplay />
                <br />
                <div>
                    {characters.map((character) => (
                        <Collapsible trigger={character.name} key={character.name} >
                            <p>Gender: {character.gender}</p>
                            <p>Height: {character.height}</p> 
                            <p>Homeworld: {character.homeworld}</p>    
                            <Collapsible trigger="Films">
                                {character.films.map((film) => (
                                    <p key={film}>{film}</p>
                                ))}
                            </Collapsible>
                        <br />
                        </Collapsible>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}