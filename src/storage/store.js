import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers";
import { logging } from "./middlewares/logging";
const store = configureStore(
    { 
        reducer: reducers,
        middleware: [logging],
        devTools: process.env.NODE_ENV !== 'production'
    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;