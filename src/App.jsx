import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './redux/store/configStore';
import { loadNotes } from './redux/slice/notes';

function App() {

    const store = configStore();

    //dispatch action
    store.dispatch(loadNotes());

    setTimeout(()=> store.dispatch(loadNotes()),3000)
    return (
        <React.Fragment>
            <div className="title">
                <h1>REDUX</h1>
            </div>
        </React.Fragment>
    );
}

export default App;
