import { configureStore } from "@reduxjs/toolkit";

import { saveToLocalStorage } from "../services/localStorage";
import currencyReducer from "../components/converter/converterSlice";

const store = configureStore({
    reducer: currencyReducer,
    middleware: getDefaultMidleware => getDefaultMidleware(),
    devTools: process.env.NODE_ENV !== "production",
})

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});
              
export default store;

export type RootState = ReturnType<typeof store.getState>;