import axios from 'axios';
import * as actions from '../api'

//actions that indicate an api call.
//axios is used to make api calls

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    if (onStart) dispatch({ type: onStart }); 
    next(action);
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url, //url of the api endpoint
            method,
            data,
        });
        dispatch(actions.apiCallSuccess(response.data))
        //specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        dispatch(actions.apiCallFailed(error.message));
        //specific
        if (onError) dispatch({ type: onError, payload: error.message });
    }
};

export default api;