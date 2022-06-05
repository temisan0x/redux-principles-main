import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from '../api'

let lastId = 0;

export const slice = createSlice({
    name: "notes",
    initialState: {
        loading: false,
        list: [],
        fetchedList: null,
    },
    reducers: {
        notesRecieved: (notes, action) => {
            notes.list = action.payload;
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

export const { noteAdded, noteResolved, noteAssignedToUser,  notesRecieved} = slice.actions;
export default slice.reducer;


//Actions Creator

let url = "/notes";

export const loadNotes = () => apiCallBegan({
    url,
    onSuccess: notesRecieved.type
});
