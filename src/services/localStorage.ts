import { DataState } from "../data/data";

export const loadFromLocalStorage = (initialState: DataState) => {
    try {
        const new_state = localStorage.getItem("Currencies");
        return JSON.parse(new_state || JSON.stringify(initialState))
    }
    catch (e) {
        console.log(e)
    }
}

export const saveToLocalStorage = (state: DataState) => {
    try {
        localStorage.setItem("Currencies", JSON.stringify(state))
    }
    catch (e) {
        console.log(e)
    }
}