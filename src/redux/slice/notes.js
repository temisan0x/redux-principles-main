import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

export const slice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        noteAssignedToUser: (notes, action) => {
            const { noteId, userId } = action.payload;
            const index = notes.findIndex(note => note.id === noteId);
            notes[index].userId = userId;
        },
        noteAdded: (notes, action) => {
            notes.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        noteResolved: (notes, action) => {
            const index = notes.findIndex(note => note.id === action.payload.id);
            notes[index].resolved = true;
        }
    }
})

//selector is a function that takes a state and returns the computed state.
export const getUnresolvedNotes = state =>  state.entities.notes.filter(note => !note.resolved);
export const getNotesByUser = state => state.entities.notes.filter(note => note.userId === !note.userId);

export const { noteAdded, noteResolved, noteAssignedToUser } = slice.actions;
export default slice.reducer;
