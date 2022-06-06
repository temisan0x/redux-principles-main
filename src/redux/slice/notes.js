import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from '../api';
import moment from 'moment';

// let lastId = 0;

export const slice = createSlice({
    name: "notes",
    initialState: {
        loading: false,
        list: [],
        lastFetch: null,
    },
    reducers: {
        notesRequested: (notes, action) => {
            notes.loading = true;
        },
        notesRecieved: (notes, action) => {
            notes.list = action.payload;
            notes.loading = false;
            notes.lastFetch = Date.now();
        },
        notesRequestFailed: (notes, action) => {
            notes.loading = false;
        },
        noteAssignedToUser: (notes, action) => {
            const {userId: noteId, userId } = action.payload;
            const index = notes.list.findIndex(note => note.id === noteId);
            notes.list[index].userId = userId;
        },
        noteAdded: (notes, action) => {
            notes.list.push(action.payload)
        },
        noteResolved: (notes, action) => {
            const index = notes.list.findIndex(note => note.id === action.payload.id);
            notes.list[index].resolved = true;
        }
    }
})

//selector is a function that takes a state and returns the computed state.
// export const getUnresolvedNotes = state => state.entities.notes.filter(note => !note.resolved);
export const getUnresolvedNotes = createSelector(
    state => state.entities.notes,
    state => state.entities.projects,
    (notes, projects) => notes.filter(note => !note.resolved)
)

export const getNotesByUser = state => state.entities.notes.filter(note => note.userId === !note.userId);

//extracted actions
const { noteAdded, noteResolved, noteAssignedToUser, notesRecieved, notesRequested, notesRequestFailed } = slice.actions;
export default slice.reducer;


//Actions Creator
let url = "/notes";

export const loadNotes = () => ({dispatch, getState}) => {
    const { lastFetch } = getState().entities.notes;
    const diffInMinutes = moment().diff(moment(lastFetch),'minutes');
    if (diffInMinutes < 10) return;
    dispatch(
        apiCallBegan({
        url,
        onStart: notesRequested.type,
        onSuccess: notesRecieved.type,
        onError: notesRequestFailed.type
        }))
    
}

//saving data to the server
export const addNotes = (note) => apiCallBegan({
    url,
    method: "post",
    data: note,
    onSuccess: noteAdded.type
});

//asinging notes to a user 
export const assignNotesToUser = (noteId, userId) => apiCallBegan({
    url: url + "/" + noteId,
    method: "patch",
    data: { userId },
    onSuccess: noteAssignedToUser.type,
});


export const resolveNotes = (userId) => apiCallBegan({
    url: url + "/" + userId,
    method: "patch",
    data: { userId },
    onSuccess: noteResolved.type
})

//shift command 0,