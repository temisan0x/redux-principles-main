import { combineReducers } from "redux";
import notesReducer from './notes';
import projectsReducer from './projects'

export default combineReducers({
    notes: notesReducer,
    projects: projectsReducer
})