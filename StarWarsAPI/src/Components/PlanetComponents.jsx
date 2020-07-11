import React, { useState, useEffect } from "react";
import Collapsible from 'react-collapsible'
import './Components.css'



export const PlanetList = props => {
    const startingPlanets = [];
    const startingURL = [`https://swapi.co/api/planets/`];
    

    // Hooks
    const [allPlanets, setAllPlanets] = useState(startingPlanets);
    const [searchTerm, setSearchTerm] = useState("");
    const [planets, setPlanets] = useState(startingPlanets);
    const [loadStatement, setLoadStatement] = useState("");
    
    
    // Boolean hook for loading bar
    const [isLoading, setIsLoading] = useState(false);
 

    const callWithFetch = async () => {
        // Setting loading to true
        setIsLoading(true);
        setLoadStatement("Loading Planets...")

        let planetArr = [];
        let nextURL = startingURL;

        while(nextURL != null) {
            let urls = [`${nextURL}`];

            const subPlanetArrays = urls.map(async url => { 
                const response = await fetch(url);
                const json = await response.json();
                const allPlanets = json.results;
              
                // Next page information if there
                nextURL = json.next;
            
                return allPlanets;
            });

            const awaitedThings = await Promise.all(subPlanetArrays);
            urls = [`${nextURL}`];
            const allPlanets = awaitedThings.flat();
            planetArr.push(allPlanets);
        }

        let tempArr = planetArr.flat();

        // Updating the list to display planet info
        setPlanets(tempArr);
        setAllPlanets(tempArr);

        setLoadStatement("Loading Planet Films...")

        // Replacing the planets film info
        for(var i = 0; i < tempArr.length; i++){
            for(var j = 0; j < tempArr[i].films.length; j++){
                const response = await fetch(tempArr[i].films[j]);
                const json = await response.json()
                tempArr[i].films[j] = json.title;
            }
        }
         

        // Final update of the planet list
        setLoadStatement("Done");
        setAllPlanets(tempArr);
        setPlanets(tempArr);
        setIsLoading(false);
    };


    useEffect(() => {
       if(allPlanets.length === 0)
            callWithFetch();
    });
    

    useEffect(() => {
        document.title = `Showing ${planets.length} planets`;
    });
      

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setPlanets(allPlanets.filter(planet => planet.name.toString().toLowerCase().includes(event.target.value.toLowerCase())));
    };


    const LoadingBarDisplay = () => {
        return <> {isLoading && <p>{loadStatement}</p>} </>;
    };


    return(
        <React.Fragment>
            <div>
                <h1>Planets</h1>
                <h6>Search through the Planets</h6>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search By Planet" />
                <br />
                <LoadingBarDisplay />
                <br />
                <div>
                    {planets.map((planet) => (
                        <Collapsible trigger={planet.name} key={planet.name}>
                            <p>Climate: {planet.climate}</p>
                            <p>Terrain: {planet.terrain}</p>
                            <p>Population: {planet.population}</p>
                            <Collapsible trigger="Films">
                                {planet.films.map((film) => (
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