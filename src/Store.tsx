import React from 'react';
import { IState, IAction } from './interfaces'

const initialState: IState = {
    //populate initialState with ~ episode & favorites
    //the initial stage is then passed down to the store
    //which then fetches the data through an array
    episodes: [],
    favourites: [],
}

//create the store & then pass "episodes & favourite" from initialState

export const Store = React.createContext<IState | any>(initialState); //front-end store [pass]

//Reducer manipulates & changes  the store
function reducer(state: IState, action: IAction): IState {//[pass IState as a generic]
    switch (action.type) {
        //IAction ~ type string, which fetches the data from the api.
        case 'FETCH_DATA':
            //checked
            // then populate the store
            //get whatever is in  our state
            return { ...state, episodes: action.payload }
        case 'ADD_FAV':
            //add whatever is the state to the favorites
            return { ...state, favourites: [...state.favourites, action.payload] }
        default:
            return state
    }
}


//StoreProvider gives the component in the app access to the store.
//value: state & dispatch is passed to App.tsx;
//dispatch(argument) triggers the action
//useReducer has a default value of reducer & and initialState
//takes reducer as the first arg, takes initialState as 2nd arg
//variable ~ [state, dispatch] is passed to the value.
//then, passed down to the Provider value as an object 
//useReducer communicates to the component

export function StoreProvider(props: any): JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <Store.Provider value={{ state, dispatch }}>
            {props.children}
        </Store.Provider>
    )
}

// https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes