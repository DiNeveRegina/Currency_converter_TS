import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DataCurrency, DataState } from "../../data/data";
import { loadFromLocalStorage } from "../../services/localStorage";

const initialState: DataState = {
    currencies: [],
    active_names_first: ["usd", "eur"],
    active_names_second: ["rub", "rub"],
    active_rates_first: [],
    active_rates_second: [],
    amounts_first: [1, 1],
    amounts_second: [],
    currency_status: "idle"
  };

const persistedStore: DataState = loadFromLocalStorage(initialState);

const converterSlice = createSlice({
    name: "currency",
    initialState: persistedStore,
    reducers: {
        currencyFetching: (state) => {
            state.currency_status = "loading";
        },

        currencyFetched: (state, action: PayloadAction<DataCurrency[]>) => {
            state.currencies = action.payload;
            state.currency_status = "idle"
        },
        
        currencyFetchingError: (state) => {
            state.currency_status = "error"
        },

        changeActive: (state, action: PayloadAction<{new_name: string, number: string, index: number}>) => {
            if (action.payload.number === "first"){
                state.active_names_first.splice(action.payload.index, 1, action.payload.new_name);
            } else if (action.payload.number === "second"){
                state.active_names_second.splice(action.payload.index, 1, action.payload.new_name);
            }
        },

        currencyPermutation: (state, action: PayloadAction<number>) => {
            const permutation_name = state.active_names_first[action.payload];
            const permutation_rate = state.active_rates_first[action.payload];

            state.active_names_first.splice(action.payload, 1, state.active_names_second[action.payload]);
            state.active_rates_first.splice(action.payload, 1, state.active_rates_second[action.payload]);

            state.active_names_second.splice(action.payload, 1, permutation_name);
            state.active_rates_second.splice(action.payload, 1, permutation_rate);

        },

        changeRateFirst: (state, action: PayloadAction<{new_active_rate: number, index: number}>) => {
                state.active_rates_first.splice(action.payload.index, 1, action.payload.new_active_rate);
        },

        changeRateSecond: (state, action: PayloadAction<{new_active_rate: number, index: number}>) => {
                state.active_rates_second.splice(action.payload.index, 1, action.payload.new_active_rate);
        },

        changeAmountFirst: (state, action: PayloadAction<{new_amount: number, index: number}>) => {
            state.amounts_first.splice(action.payload.index, 1, action.payload.new_amount);
        },

        changeAmountSecond: (state, action: PayloadAction<{new_amount: number, index: number}>) => {
            state.amounts_second.splice(action.payload.index, 1, action.payload.new_amount);
        },

        addPair:(state, action: PayloadAction<{currency_first: DataCurrency, currency_second: DataCurrency}>) => {
            state.active_names_first.push(action.payload.currency_first.name);
            state.active_names_second.push(action.payload.currency_second.name);
            state.active_rates_first.push(Number(action.payload.currency_first.salary));
            state.active_rates_second.push(Number(action.payload.currency_second.salary));
            state.amounts_first.push(1)
        },

        deletePair: (state, action: PayloadAction<number>) => {
            state.active_names_first = state.active_names_first.filter((item, i) => i !== action.payload);
            state.active_names_second = state.active_names_second.filter((item, i) => i !== action.payload);

            state.active_rates_first = state.active_rates_first.filter((item, i) => i !== action.payload);
            state.active_rates_second= state.active_rates_second.filter((item, i) => i !== action.payload);

            state.amounts_first = state.amounts_first.filter((item, i) => i !== action.payload);
            state.amounts_second = state.amounts_second.filter((item, i) => i !== action.payload);
        }
    }
})

export const {
    currencyFetched,
    currencyFetching,
    currencyFetchingError,

    addPair,
    deletePair,

    changeAmountFirst,
    changeAmountSecond,
    changeRateFirst,
    changeRateSecond,

    changeActive,
    currencyPermutation
} = converterSlice.actions;

export default converterSlice.reducer;