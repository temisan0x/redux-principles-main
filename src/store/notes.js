const NOTE_ADDED = "noteAdded";
const NOTE_REMOVED = "noteRemoved";
const NOTE_RESOLVED = "noteResolved";

//ACTIONS CREATOR~

function noteAdded(description) {
    return {
        type: NOTE_ADDED,
        payload: { description }
    }
};

function noteRemoved(id) {
    return {
        type: NOTE_REMOVED,
        payload: { id }
    }
}

function noteResolved(id) {
    return {
        type: NOTE_RESOLVED,
        payload: { id }
    }
}

//REDUCERS

let lastId = 0;
// eslint-disable-next-line no-unused-vars
function reducer(state = [], action) {
    //action.type == NOTE_ADDED
    switch (action.type) {
        case NOTE_ADDED:
            return [...state, {
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            }]
        case NOTE_REMOVED:
            return state.filter(note => note.id !== action.payload.id);
        case NOTE_RESOLVED:
            return state.map(note => note.id === action.payload.id ?
                note: {...note, resolved: true}
                );
        default:
            return state;
    }
}