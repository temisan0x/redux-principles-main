import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './redux/store/configStore';
import { loadNotes, addNotes, assignNotesToUser, resolveNotes } from './redux/slice/notes';

function App() {

    const store = configStore();

    //dispatch action
    store.dispatch(addNotes({ description: "a" }));
    setTimeout(() => store.dispatch(assignNotesToUser(1, 3)), 3000)

    setTimeout(() => store.dispatch(resolveNotes(1)), 3000)

    store.dispatch(loadNotes());

    return (
        <React.Fragment>
            <div className="title">
                <h1>REDUX</h1>
            </div>
        </React.Fragment>
    );
}

export default App;
