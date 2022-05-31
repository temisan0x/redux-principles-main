import axios from 'axios'
//actions that indicate an api call.
//axios is used to make api calls

const api = ({ dispatch }) => next => async action => {
    if (action.type !== "apiCall") return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;
    try {
        const response = axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data,
        });
        dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        dispatch({ type: onError, payload: error.message });
    }
}

export default api;