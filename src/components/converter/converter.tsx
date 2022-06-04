import React from "react";
import { useDispatch, useSelector } from "react-redux";
import nextId from "react-id-generator";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

import { DataCurrency } from "../../data/data";
import setContent from "../../services/setContent";
import { Currency } from "../currency/currency";
import { useHttp } from "../../services/request";
import { calculations } from "../calculations/calculations";
import { RootState } from "../../store/store";
import {currencyFetched,
        currencyFetching,
        currencyFetchingError,
        changeRateFirst,
        changeRateSecond,
        addPair} from "./converterSlice";

import "./currency-flags.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./converter.css";


export const Converter: React.FC = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();

    const active_names_first = useSelector((state: RootState) => state.active_names_first);
    const active_names_second = useSelector((state: RootState) => state.active_names_second);
    const currencies = useSelector((state: RootState) => state.currencies);
    const currency_status = useSelector((state: RootState) => state.currency_status);

    React.useEffect(() => {
        dispatch(currencyFetching());

        request("http://localhost:3001/currency")
            .then(data => dispatch(currencyFetched(data)))
            .then(data => setInitial(data.payload))
            .catch(() => dispatch(currencyFetchingError()))
    }, []);

    const setInitial = (dataCurrency: DataCurrency[]) => {
        active_names_first.forEach((item, i) => {
            changeRate(item, i, "first", dataCurrency);
        })

        active_names_second.forEach((item, i) => {
            changeRate(item, i, "second", dataCurrency);
        })

        active_names_first.forEach((item, index) => {
            calculations("first_input", index);
        })
    }

    const changeRate = (name: string, index: number, number: string, data: DataCurrency[]) => {
        const new_active_rate =  Number(data.find(item => item.name === name)?.salary);
        number === "first" ? dispatch(changeRateFirst({new_active_rate, index})) :
                             dispatch(changeRateSecond({new_active_rate, index}))
    }

    const addNewPair = (index: number) => {
        const max = currencies.length;

        const id_first = Math.floor(Math.random() * (max-1));
        const id_second = Math.floor(Math.random() * (max-1));

        const currency_first = currencies[id_first];
        const currency_second = currencies[id_second];

        dispatch(addPair({currency_first, currency_second}));
        calculations("first_input", index);
    }

    const renderList = (first_names: string[]) => {
        const elements = first_names.map((item, i) => {
            return <Currency key={nextId()}
                             name={item}
                             index={i}
                             changeRate={changeRate}/>
        })

        return (
            <>
                {elements}
                <div className="Currency_container">
                    <OverlayTrigger
                        key="first_tooltip"
                        placement="right"
                        overlay={
                            <Tooltip id="tooltip-first">
                                Add a new currency pair
                            </Tooltip>
                        }
                    >
                        <div className="Currency_harr add" onClick={() => addNewPair(active_names_first.length)}>+</div>
                    </OverlayTrigger>
                </div>
            </>
        )
    }

    return (
        <>
            {setContent(currency_status,
                        () => renderList(active_names_first)
            )}
        </>
    )
}