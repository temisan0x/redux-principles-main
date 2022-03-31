import React from 'react';
import './App.css';
import { Store } from './Store';
import Img from './assets/thumb-1920-909641.png'
import { IEpisode, IAction } from './interfaces'

//store is imported from the parent element


function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  })

  //action
  const fetchDataAction = async () => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    const data = await fetch(URL) //Fetch Url
    const dataJSON = await data.json();
    //convert data to a readable json
    //use the dispatch method to fetch data to the state.
    return dispatch({
      type: 'FETCH_DATA', //checked
      payload: dataJSON._embedded.episodes
    })
  }

  //export interface from store 
  const toggleFavAction = (episode: IEpisode): IAction => dispatch({
    type: 'Add_FAV', //add functionality from the store.
    payload: episode
  })
  console.log(state);


  return (
    <React.Fragment>
      <header className='header'>
        <h1>Ricky</h1>
        <p>Pick your favourite episode!!!</p>
      </header>
      <section className='episode-layout'>
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              {/* <img src={episode.image.original} alt={`Ricky${episode.name}`} /> */}
              <img src={Img} alt="temporary display thumbnail" width={100} height={100} />
              <section>
                <div>
                  Season: {episode.season} Number: {episode.number}
                </div>
                <button type="button" onClick={() => toggleFavAction(episode)}>
                  Fav
                </button>
              </section>
            </section>
          )
        })}
      </section>
    </React.Fragment>
  );
}

export default App;
