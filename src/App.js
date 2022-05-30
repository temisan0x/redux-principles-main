import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './store/configStore';
import * as actions from './store/notes'

function App() {
    const store = configStore();

    store.dispatch(actions.noteAdded({ note: "note added" }));
    store.dispatch(actions.noteResolved(1));

    console.log(store.getState());

    console.log(store);
    return (
        <React.Fragment>
            <div className="title">
                <h1>REDUX</h1>
            </div>
        </React.Fragment>
    );
}

export default App;
