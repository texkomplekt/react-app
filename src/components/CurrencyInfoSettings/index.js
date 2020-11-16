import React, {useContext, useEffect, useState, useMemo} from 'react';
import { connect } from 'react-redux';
import CurrencyInfo from '../CurrencyInfo';
import CurrencyButtons from '../CurrencyButtons';
import { ThemeContext } from '../context/ThemeContext';
import DatePicker from 'react-date-picker';
import { getDate, getDeltaDay, getApiDate } from '../../lib/date';
import { API } from '../../Connection';
import './index.scss';

const CurrencyInfoSettings = ({ 
    match,
    history,
    dispatch,
    infoItems,
}) => {
    const theme = useContext(ThemeContext);
    const [data, setData] = useState({code: 'RUB', base: 'USD', value: 1});
    const [date, setDate] = useState(new Date());

    const onChangeInput = async (name, val) => {
        await setData(old => ({...old, ...{[name]: val}}));
    };

    const onChangeWidget = () => {
        const type = match.params.id ? 'UPDATE_DATA' : 'ADD_DATA';
        dispatch({type: type, data: {...data, date: getApiDate(date), id: match.params.id || ''}});
        history.push('/charts');
    }

    const getRates = () => {
        API.history({
            symbols: data.code,
            base: data.base,
            start_at: getDeltaDay(getApiDate(date)),
            end_at: getApiDate(date),
        }).then(res => {
            if (!res.error) { 
                setData((old) => ({
                    ...old, 
                    value: Math.floor(Object.values(res.rates)[0][data.code] * 1000) / 1000}));
            }
        })
        .catch(() => {});
    };

    useEffect(() => {
        const {id} = match.params;
        if (id) {
            const {base, code, value, date} = infoItems[id];
            setData({base: base, code: code, value: value});
            setDate(getDate(date));
        } else {
            getRates();
        }       
    }, []);

    useEffect(() => getRates(), [data.code, data.base, date]);

    const baseButtons = useMemo(() => 
        <CurrencyButtons initCode={data.base} onChange={(val) => onChangeInput('base', val)}/>,
        [data.base]);
    
    const codeButtons = useMemo(() => 
        <CurrencyButtons initCode={data.code} onChange={(val) => onChangeInput('code', val)}/>,
        [data.code]);

    return (
        <section className={`info-settings ${theme.tone}`}>
            <form
                className={`form-settings ${theme.tone}`}>
                <div>
                    <div className="form-item">
                        <label className={`label ${theme.tone}`}>
                            базовая валюта
                        </label>
                        {baseButtons}
                    </div>
                    <div className="form-item">
                        <label className={`label ${theme.tone}`}>
                            котируемая валюта
                        </label>
                        {codeButtons}
                    </div>        
                    <DatePicker 
                        value={date}
                        onChange={setDate}
                        className={`datepicker ${theme.tone}`}
                        calendarClassName={`calendar ${theme.color}`}/>
                </div>            
                <button 
                    className={`button submit ${theme.tone} ${theme.color}`}
                    onClick={onChangeWidget}>
                        Готово
                </button>
            </form>
            <CurrencyInfo data={{...data, date: getApiDate(date)}}/>
        </section>
    )
}

CurrencyInfoSettings.displayName = 'CurrencyInfoSettings';

const mapStateToProps = state => ({infoItems: state.infoState});

export default connect(mapStateToProps)(CurrencyInfoSettings);
