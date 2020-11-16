import React, {useEffect, useState, useReducer, useRef, useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import LineChart from '../LineChart';
import { getApiDate } from '../../lib/date';
import {API} from '../../Connection';
import './index.scss';

const CurrensyChart = () => {
    const initialSize = {width: 1000, height: 500};
    const [dateRange] = useState(['2020-03-01', getApiDate(new Date())]);
    const [currencies] = useState(['RUB', 'CZK', 'JPY']);
    const [size, setSize] = useState(initialSize);
    const chartRef = useRef(null);
    const theme = useContext(ThemeContext);

    const dataReducer = (state, action) => {
        switch (action && action.type) {
            case 'SET_DATA':
                const rates = action.data.rates;
                const values = {};

                currencies.forEach(code => values[code] = []);
                Object.keys(rates)
                    .map(date => 
                        Object.keys(rates[date])
                        .forEach(code => values[code].push(rates[date][code]))
                    );
                return {
                    y: 'RUB, CZK, JPY / EUR',
                    dates: Object.keys(rates),
                    series: Object.keys(values)
                        .map(code => ({name: code, values: values[code]})),
                };
            default:
                return state;
        } 
    };
    const initData = {y: '', dates: [getApiDate(new Date()), getApiDate(new Date())], series: [{name: 'RUB', values: [0, 1]}]};
    const [data, dispatch] = useReducer(dataReducer, initData);

    useEffect(() => {
        const [from, to] = dateRange;
        API.history({start_at: from, end_at: to, symbols: currencies.join(',')})
            .then(data => {
                if (data.error && data.error.includes('are invalid')) {
                    return;
                };
                dispatch({ type: 'SET_DATA', data: data});
            })
            .catch(() => {});
    }, [dateRange, currencies]);

    useEffect(() => {
        let size = {width: 1000, height: 500};
        if (chartRef.current) {
            const {width, height} = chartRef.current.getBoundingClientRect();
            size = {width: width, height: height};
        }        
        let timeoutId = null;
        setSize(size);
        const resizeListener = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => setSize(size), 150);
        };
        window.addEventListener('resize', resizeListener);
        return () => {
          window.removeEventListener('resize', resizeListener);
        };
      }, []);

    return (<div
            className={`currency-chart ${theme.tone}`}
            ref={chartRef}>
        <LineChart
            data={data}
            width={size.width}
            height={size.height}/>
    </div>)
}

CurrensyChart.displayName = 'CurrencyChart';

export default CurrensyChart;