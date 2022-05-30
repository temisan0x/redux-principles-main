import { createAction } from "@reduxjs/toolkit";


/* eslint-disable no-unused-vars */
export const noteAdded = createAction("noteAdded");
export const noteRemoved = createAction("noteRemoved");
export const noteResolved = createAction("noteResolved");

//REDUCERS

let lastId = 0;
// eslint-disable-next-line no-unused-vars
export function reducer(state = [], action) {
    //action.type == NOTE_ADDED
    switch (action.type) {
        case noteAdded.type:
            return [...state, {
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            }]
        case noteRemoved.type:
            return state.filter(note => note.id !== action.payload.id);
        case noteResolved.type:
            return state.map(note => note.id === action.payload.id ?
                note: {...note, resolved: true}
                );
        default:
            return state;
    }
}