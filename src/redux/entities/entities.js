import { combineReducers } from "redux";
import notesReducer from '../slice/notes';
import projectsReducer from '../slice/projects';
import usersReducer from '../slice/users'

export default combineReducers({
    notes: notesReducer,
    projects: projectsReducer,
    users: usersReducer,
})