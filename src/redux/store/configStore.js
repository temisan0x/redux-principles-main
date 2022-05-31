import { configureStore } from "@reduxjs/toolkit";
import func from "../middleware/func";
import logger from "../middleware/logger";
import toastify from "../middleware/toastify";
import reducer  from "../reducer/reducer";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return configureStore({
        reducer,
        middleware: [
            logger({ destination: "console" }),
            func,
            toastify
        ]
    });
}