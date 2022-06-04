export interface DataCurrency {
    id: number,
    name: string,
    salary: string
}

export interface DataState {
    currencies: DataCurrency[],
    active_names_first: string[],
    active_names_second: string[],
    active_rates_first: number[],
    active_rates_second: number[],
    amounts_first: number[],
    amounts_second: number[],
    currency_status: string,
}

export interface CurrencyProps {
    key: string,
    name: string,
    index: number
    changeRate: (name: string, index: number, number: string, dataCurrency: DataCurrency[]) => void
}

export interface CurrenceListProps {
    changeCurrency: (name: string, number: string, data: DataCurrency[], index: number) => void
    dataCurrencies: DataCurrency[],
    number: string,
    dropdown_class: string,
    active_name: string,
    index: number
}