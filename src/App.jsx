import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './store/configStore';
import * as actions from './store/projects'

function App() {
    const store = configStore();
    store.dispatch(actions.projectAdded({name: "project 1"}));
    // store.dispatch(actions.noteAdded({ note: "note added 1" }));
    // store.dispatch(actions.noteAdded({ note: "note added 2" }));
    // store.dispatch(actions.noteAdded({ note: "note added 3" }));
    // store.dispatch(actions.noteResolved(1));


    return (
        <React.Fragment>
            <div className="title">
                <h1>REDUX</h1>
            </div>
        </React.Fragment>
    );
}

export default App;
