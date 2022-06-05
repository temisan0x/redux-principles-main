import React from 'react';
import './App.css';
//store is imported from the parent element
import configStore from './redux/store/configStore';
import * as actions from './redux/api'

function App() {

    const store = configStore();
    //Thunk Function
    // store.dispatch(({dispatch, getState}) => {
    //     dispatch({
    //         type: "error",
    //         payload: {message: ": an error occured"}
    //     })
    // })

    store.dispatch({
        type: actions.apiCallBegan.type,
        payload: {
            url: "/notes",
            onSuccess: actions.apiCallSuccess.type,
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
