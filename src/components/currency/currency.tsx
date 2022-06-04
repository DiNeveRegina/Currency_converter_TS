import React from "react";
import { useDispatch, useSelector } from "react-redux";
import nextId from "react-id-generator";

import { CloseButton, OverlayTrigger, Dropdown, Tooltip } from "react-bootstrap";

import { RootState } from "../../store/store";
import { CurrenceListProps, CurrencyProps, DataCurrency } from "../../data/data";
import { calculations } from "../calculations/calculations";
import { currencyPermutation,
         changeAmountFirst,
         changeAmountSecond,
         changeActive,
         deletePair } from "../converter/converterSlice";

export const Currency: React.FC<CurrencyProps> = (props) => {
    const {index, changeRate} = props;

    const {active_names_first, active_names_second, amounts_first, amounts_second, currencies} = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    const permutationCurrency = (index: number) => {
        dispatch(currencyPermutation(index))
        calculations("first_input", index)
    }

    const onChangeAmountFirst = (active: string, index: number, new_amount_first: string) => {
        const new_amount = Number(new_amount_first);
        dispatch(changeAmountFirst({new_amount, index}));
        calculations(active, index);
    }

    const onChangeAmountSecond = (active: string, index: number, new_amount_second: string) => {
        const new_amount = Number(new_amount_second);
        dispatch(changeAmountSecond({new_amount, index}))
        calculations(active, index)
    }

    const changeCurrency = (new_name: string, number: string, data: DataCurrency[], index: number) => {
        dispatch(changeActive({new_name, number, index}));
        changeRate(new_name, index, number, data);
        calculations(number, index);
    }

    const deletedPair = (index: number) => {
        dispatch(deletePair(index));
    }

    const class_first = `currency-flag currency-flag-${active_names_first[index]}`;
    const class_second = `currency-flag currency-flag-${active_names_second[index]}`;

    return (
        <div className="Currency_container">
            <div className="Currency_setting_values">
                <input 
                    required
                    type="number"
                    id="input_first"
                    className="Currency_input"
                    value={amounts_first[index]}
                    onChange={(e) => onChangeAmountFirst("first_input", index, e.target.value)}/>
                <CurrencyList
                    changeCurrency={changeCurrency}
                    dataCurrencies={currencies}
                    number={"first"}
                    dropdown_class={class_first}
                    active_name={active_names_first[index]}
                    index={index}/>
            </div>

            <div className="Currency_harr" onClick={() => permutationCurrency(index)}>&#8596;</div>

            <div className="Currency_setting_values">
                <input 
                    required
                    type="number"
                    id="input-second"
                    className="Currency_input"
                    value={amounts_second[index]}
                    onChange={(e) => onChangeAmountSecond("second_input", index, e.target.value)}/>
                <CurrencyList 
                    changeCurrency={changeCurrency}
                    dataCurrencies={currencies}
                    number={"second"}
                    dropdown_class={class_second}
                    active_name={active_names_second[index]}
                    index={index}/>
            </div>

            <OverlayTrigger
                key="second_tooltip"
                placement="right"
                overlay={
                    <Tooltip id="tooltip-second">
                        Delete this currency pair
                    </Tooltip>
                }
            >
                <CloseButton aria-label="Hide" onClick={() => deletedPair(index)} />
            </OverlayTrigger>

        </div>
    )
}

const CurrencyList: React.FC<CurrenceListProps> = (props) => {
    const {dataCurrencies, number, dropdown_class, active_name, index, changeCurrency} = props;

    const id = `dropdown-basic-${number}`;

    const element = dataCurrencies.map(item => {
        return <Dropdown.Item key={nextId()} onClick={() => changeCurrency(item.name, number, dataCurrencies, index)} className="dropdown-item">{item.name}</Dropdown.Item>
    })

    return (
        <Dropdown key={nextId()}>
            <Dropdown.Toggle variant="success" id={id} style={{backgroundColor: "rgb(112, 76, 182)"}}>
                <div className={dropdown_class}></div>
                <div className="Currency_name">{active_name}</div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {element}
            </Dropdown.Menu>
        </Dropdown>
    )
}