import axios from 'axios'
//actions that indicate an api call.
//axios is used to make api calls

const api = ({ dispatch }) => next => async action => {
    if (action.type !== "apiCallBegan") return next(action);
    next(action);
    const { url, method, data, onSuccess, onError } = action.payload;
    try {
        const response = axios.request({
            baseURL: 'http://localhost:9002/api',
            url,
            method,
            data,
        });
        dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        dispatch({ type: onError, payload: error });
    }
}

export default api;