import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './redux/store/configStore';

function App() {
    const store = configStore();
    //Thunk Function
    store.dispatch(({dispatch, getState}) => {
        dispatch({
            type: "error",
            payload: {message: ": an error occured"}
        })
    })

    store.dispatch({
        type: "apiCall",
        payload: {
            url: "/notes",
            onSuccess: "apiResponseReceived",
            onError: "apiRequestFailed"
        }
    });


    return (
        <React.Fragment>
            <div className="title">
                <h1>REDUX</h1>
            </div>
        </React.Fragment>
    );
}

export default App;
