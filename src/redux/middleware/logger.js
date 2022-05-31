//next is synomous to the reducer that handles the action
//action is the action dispatch
//curring
const logger = param => store => next => action => {
    console.log("Logging", param);
    next(action)
}

export default logger;