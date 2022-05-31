import { createSlice } from '@reduxjs/toolkit';

let projectId = 0;

export const slice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        projectAdded: (projects, action) => {
            projects.push({
                id: ++projectId,
                name: action.payload.name
            })
        }
    }
})

export const {projectAdded} = slice.actions;
export default slice.reducer;