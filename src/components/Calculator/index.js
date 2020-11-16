import React, {useEffect, useContext, useReducer, useMemo, useCallback} from 'react';
import { useForm } from "react-hook-form";
import {ThemeContext} from '../context/ThemeContext';
import { API } from './../../Connection';
import CurrencyButtons from '../CurrencyButtons';
import Reverse from '../../assets/img/Reverse';
import './index.scss';

const Calculator = () => {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const theme = useContext(ThemeContext);
    const initialCurrency = {from: {code: 'USD', value: '', rates: ''}, to: {code: 'RUB', value: '', rates: ''}};
    const currencyReducer = (state, action) => {
        let old = {...state};
        switch (action.type) {
            case 'SET_FROM':
                old.from.rates = Math.floor(action.data.rates[old.to.code] * 10000) / 10000;
                return old;
            case 'SET_TO':
                old.to.rates = Math.floor(action.data.rates[old.from.code] * 10000) / 10000;
                return old;
            case 'SET_FROM_CODE':
                old.from.code = action.newCode;
                return old;
            case 'SET_TO_CODE':
                old.to.code = action.newCode;
                return old;
            case 'REVERSE':
                old.to = {...state.from};
                old.from = {...state.to};
                old.from.value = 1;
                old.to.value = null;
                setValue('valueTo', null);
                return old;
            default:
            return state;
        }
    };
    const [currency, dispatchCurrency] = useReducer(currencyReducer, initialCurrency);

    const onSubmit = data => console.log(data);
    const onInputFrom = () => {
        const val = parseInt(getValues("valueFrom"), 10);
        if (val && val > 0) {
            setValue('valueFrom', val.toString());
            setValue('valueTo', Math.floor(currency.from.rates * val * 10000) / 10000);
        } else {
            setValue('valueTo', '');
        }
    }

    const getRates = useCallback(() => {
        setValue('valueTo', '');
        setValue('valueFrom', '');
        API.latest({base: currency.from.code, symbols: currency.to.code})
            .then(data => dispatchCurrency({type: 'SET_FROM', data}))
            .catch(() => {});
        API.latest({base: currency.to.code, symbols: currency.from.code})
            .then(data => dispatchCurrency({type: 'SET_TO', data}))
            .catch(() => {});
    }, [currency.from.code, currency.to.code, setValue]);

    useEffect(() => getRates(), [getRates]);

    const buttonsFrom = useMemo(() => {
        const onChangeFrom = async (newCode) => {
            await dispatchCurrency({type: 'SET_FROM_CODE', newCode});
            getRates();};
        return <CurrencyButtons initCode={currency.from.code} onChange={onChangeFrom}/>
        },
        [currency.from.code]);
    
    const buttonsTo = useMemo(() => {
        const onChangeTo = async (newCode) => {
            await dispatchCurrency({type: 'SET_TO_CODE', newCode});
            getRates();
        };
            return <CurrencyButtons initCode={currency.to.code} onChange={onChangeTo}/>
        },
        [currency.to.code]);
    return (
        <article className={`calculator ${theme.tone}`}>
            <header className={`header-widget ${theme.tone}`}>
                <h3 className="header-title">Калькулятор валюты</h3>
            </header>
            <div className="calculator-wrapper">
                <span 
                    className="single-rate"
                    style={{margin: '0 0 30px 0'}}>{new Date().toLocaleString()}</span>
                <form 
                    className="form"
                    onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-block">
                            {buttonsFrom}
                            <label className={`label ${theme.tone}`}>
                                из
                                <input 
                                    name="valueFrom"
                                    className={`input ${theme.tone} ${theme.color}`}
                                    type="text"
                                    maxLength={6}
                                    autoComplete="off"
                                    ref={register({ required: true })}
                                    onInput={onInputFrom}/>
                            </label>
                            <span className="single-rate">{`1 ${currency.from.code} = ${currency.from.rates} ${currency.to.code}`}</span>
                        </div>
                        <button 
                            className="button icon button-reverse"
                            onClick={() => dispatchCurrency({type: 'REVERSE'})}>
                            <Reverse/>
                        </button>
                        <div className="form-block"> 
                            {buttonsTo}
                            <label className={`label ${theme.tone}`}>
                                в
                                <input 
                                    name="valueTo"
                                    className={`input ${theme.tone} ${theme.color}`}
                                    type="text"
                                    autoComplete="off"
                                    ref={register}
                                    disabled/>
                            </label>
                            <span className="single-rate">{`1 ${currency.to.code} = ${currency.to.rates} ${currency.from.code}`}</span>        
                        </div>
                    </form>
            </div>
        </article>
)};

Calculator.displayName = 'Calculator';

export default Calculator;