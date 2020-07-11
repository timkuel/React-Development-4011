import React, { useState, useEffect } from "react";
import Collapsible from 'react-collapsible';
import './Components.css';


export const FilmList = props => {
    const startingFilms = [];
    const startingURL = [`https://swapi.co/api/films/`];


    // Hooks
    const [allFilms, setAllFilms] = useState(startingFilms);
    const [searchTerm, setSearchTerm] = useState("");
    const [films, setFilms] = useState(startingFilms);
    const [loadStatement, setLoadStatement] = useState("");


    // Boolean hook for loading bar
    const [isLoading, setIsLoading] = useState(false);


    const callWithFetch = async () => {
        // Setting loading to true
        setIsLoading(true);
        setLoadStatement("Loading Films...")

        let filmArr = [];
        let nextURL = startingURL;

        while(nextURL != null) {
            let urls = [`${nextURL}`];

            const subFilmArrays = urls.map(async url => {
                const response = await fetch(url);
                const json = await response.json();
                const allFilms = json.results;
              
                // Next page information if there
                nextURL = json.next;
            
                return allFilms;
            });

            const awaitedThings = await Promise.all(subFilmArrays);
            urls = [`${nextURL}`];
            const films = awaitedThings.flat();
            filmArr.push(films);
        }
        
        // Final update of the character list
        setLoadStatement("Done");
        setAllFilms(filmArr.flat());
        setFilms(filmArr.flat());
        setIsLoading(false);
    };


    useEffect(() => {
        if (allFilms.length === 0)
            callWithFetch();
    });
    

    useEffect(() => {
        document.title = `Showing ${films.length} films`;
    });
      

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setFilms(allFilms.filter(film => film.title.toString().toLowerCase().includes(event.target.value.toLowerCase())));
    };


    const LoadingBarDisplay = () => {
        return <> {isLoading && <p>{loadStatement}</p>} </>;
    };


    return(
        <React.Fragment>
            <div>
                <h1>Films</h1>
                <h6>Search through the Films</h6>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search By Title" />
                <br />
                <LoadingBarDisplay />
                <br />
                <div>
                    {films.map((film) => (
                        <Collapsible trigger={film.title} key={film.title}>
                            <p>Episode ID: {film.episode_id}</p>
                            <p>Director: {film.director}</p>
                            <p>Release Date: {film.release_date}</p>
                            <p>Opening Crawl: {film.opening_crawl}</p>
                        </Collapsible>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}