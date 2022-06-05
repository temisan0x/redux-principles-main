import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './redux/store/configStore';
import * as actions from './redux/api'

function App() {

    const store = configStore();
    
    //dispatch action
    store.dispatch(
        actions.apiCallBegan({
            url: "/notes",
            onSuccess: "notes/notesRecieved"
        })
    );


    return (
        <React.Fragment>
            <div className="title">
                <h1>REDUX</h1>
            </div>
        </React.Fragment>
    );
}

export default App;
