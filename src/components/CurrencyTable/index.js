import React, { useContext, useEffect, useReducer } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {API} from '../../Connection';
import currency from '../../lib/currency';
import './index.scss';

const CurrencyTable = () => {
    const theme = useContext(ThemeContext);

    const reducer = (state, action) => {
        const {type, res} = action;
        let d = state;
        switch (type) {
            case 'SET_DATA':
                d = {date: res.date, rates: res.rates, base: 'RUB'};
                break;
            default:
                break;
        }
        return d;
    }

    const [data, dispatch] = useReducer(reducer, {base: 'RUB', date: '', rates: {}});
    
    useEffect(() => {
        API.latest({base: data.base})
        .then((res) => {
            dispatch({type: 'SET_DATA', res});
        })
        .catch(() => {});
    }, [data.base]); 

    return (<article className={`currency-table ${theme.tone}`}>
        <header className={`header-widget ${theme.tone}`}>
            <h3 className="header-title">Таблица котировок</h3>
        </header>
        <table className="table">
            <thead>
                <tr>
                <th>Дата</th>
                <th>Код валюты</th>
                <th>Базовая валюта</th>
                <th>Название</th>
                <th>Продажа</th>
                </tr>
            </thead>
            <tbody>{
                Object.keys(data.rates)
                    .filter(code => code!== data.base)
                    .map(code => 
                    <tr key={code}>
                        <td>{data.date}</td> 
                        <td>{code}</td>
                        <td>{data.base}</td>
                        <td>{currency[code] || code}</td>
                        <td>{ Math.floor(data.rates[code] * 10000) / 10000}</td>
                    </tr>
                )}

            </tbody>
        </table>
    </article>)
}

CurrencyTable.displayName = 'CurrencyTable';

export default CurrencyTable;