import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './store/configStore';

function App() {
console.log(configStore);
    return (
        <React.Fragment>
            <div className="title">
                <h1>REDUX</h1>
            </div>
        </React.Fragment>
    );
}

export default App;
