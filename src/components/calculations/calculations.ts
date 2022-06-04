import store from "../../store/store";
import { changeAmountFirst, changeAmountSecond} from "../converter/converterSlice";

export const calculations = (active: string, index: number) => {
    const { active_rates_first,
            active_rates_second,
            amounts_first,
            amounts_second } = store.getState();

    let new_amount: number = 0;
    let conversion_rate: number = 0;

    if ((active === "first_input") || (active === "first") || (active === "second")){
        conversion_rate = active_rates_first[index] / active_rates_second[index];
        new_amount = Math.floor((amounts_first[index] / conversion_rate) * 100) / 100;
        store.dispatch(changeAmountSecond({new_amount, index}))
    } else if ((active === "second_input")){
        conversion_rate = active_rates_second[index] / active_rates_first[index];
        new_amount = Math.floor((amounts_second[index] / conversion_rate) * 100) / 100;
        store.dispatch(changeAmountFirst({new_amount, index}))
    }
}