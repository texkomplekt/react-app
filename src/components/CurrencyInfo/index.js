import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import currency from '../../lib/currency';
import Dropdown from '../Dropdown';
import './index.scss';

const CurrencyInfo = ({
    data,
    editable,
    dispatch,
}) => {
    const {code, base, date, value, id} = data;
    const theme = useContext(ThemeContext);
    const history = useHistory();

    const onChange = () => history.push(`/currency/settings/edit/${id}`);

    const onAdd = () => history.push(`/currency/settings/new`);
    
    const menuSettings = <ul className="list" style={{zIndex: 2000}}>
        <li className="item" onClick={onChange}>Изменить</li>
        <li className="item" onClick={onAdd}>Создать</li>
        <li className="item" onClick={() => dispatch({type: 'DELETE_DATA', data: id})}>Удалить</li>
    </ul>

    return (
        <article className={`currency-info ${theme.tone} ${theme.color}`}>
            <header className={`header-widget ${theme.tone} ${theme.color}`}>
                <h3 className="header-title">Котировки</h3>
                { editable && 
                    <Dropdown 
                        button={<button className="button"/>}
                        triggerOnClick={false}>
                            {menuSettings}
                    </Dropdown>
                }
            </header>
            <div className="content">
                <p>Курс валюты</p>
                <p className="color-code">
                    <span title={currency[base]}>{base}</span>/
                    <span title={currency[code]}>{code}</span>
                </p>
                <time className="date">{date}</time>
                <div className="value">
                    <span>{value}</span>
                    <span className="diff positive">+ 3%</span>
                </div>     
            </div>
        </article>
    )
}

CurrencyInfo.displayName = 'CurrencyInfo';

CurrencyInfo.defaultProps = {
    data: {
        base: 'RUB',
        code: 'USD',
        date: '01-01-2020',
        value: 1,
    },
    editable: false,
};

export default connect()(CurrencyInfo);