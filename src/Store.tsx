import React from 'react';

interface IState {
    episodes:  Array<any>,
    favourites: Array<any>,
}

const initialState: IState = { //populate initialState
    episodes: [],
    favourites: [],
}

//create the store & then pass "episodes & favourite" from initialState
export const Store = React.createContext<IState | any>(initialState); //[pass]

export interface IAction {
    type: string,
    payload: any
}

//Reducer manipulates the store
function reducer(state: IState, action: IAction): IState {//[pass IState as a generic]
    switch (action.type) {
        case 'FETCH_DATA': //checked
            return { ...state, episodes: action.payload }
        case 'ADD_FAV':
            return {...state, favourites: [...state.favourites, action.payload]}
        default:
            return state
    }
}

export function StoreProvider(props: any): JSX.Element {
//StoreProvider gives the component in the app access to the store.
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <Store.Provider value={{state, dispatch}}>
            {props.children}
        </Store.Provider>
    )
}

// https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes