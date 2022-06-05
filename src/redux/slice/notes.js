import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from '../api';
import moment from 'moment';

let lastId = 0;

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
            const { noteId, userId } = action.payload;
            const index = notes.list.findIndex(note => note.id === noteId);
            notes.list[index].userId = userId;
        },
        noteAdded: (notes, action) => {
            notes.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
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
export const { noteAdded, noteResolved, noteAssignedToUser, notesRecieved, notesRequested, notesRequestFailed } = slice.actions;
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


//shift command 0,