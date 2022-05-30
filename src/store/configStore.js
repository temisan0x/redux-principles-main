import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./notes";

export default function configStore () {
    return configureStore({ reducer });
}