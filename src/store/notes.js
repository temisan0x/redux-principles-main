import { createSlice } from "@reduxjs/toolkit";

//REDUCERS
let lastId = 0;


export const slice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        noteAdded: (notes, action) => {
            notes.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        noteResolved: (notes, action) => {
            const index = notes.findIndex(note => note.id === action.payload.id);
            notes[index] = true;
        }
    }
})

export const { noteAdded, noteResolved } = slice.actions;
export default slice.reducer;
