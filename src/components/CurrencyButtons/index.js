import React, {useState, useContext, useEffect, useMemo} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Dropdown from '../Dropdown';
import CurrencyList from '../CurrensyList';
import './index.scss';

const CurrencyButtons = ({
    initCode,
    onChange }) => {
        const theme = useContext(ThemeContext);
        const constantCodes = ['RUB', 'USD', 'EUR'];
        const [active, setActive] = useState(initCode);
        const getCode = (val) => constantCodes.includes(val) ? 'GBP' : val;
        const [variableCode, setVariableCode] = useState(getCode(initCode));
        const values = [...constantCodes, variableCode];
        const onChangeCode = (code) => {
            setVariableCode(getCode(code));
            setActive(code);
            onChange(code);
        };

        useEffect(() => {
            setActive(initCode);
            setVariableCode(getCode(initCode));
        }, [initCode, getCode]);

        const buttonDropdown = <button 
            type="button" className={`button ${theme.tone} ${theme.color}`}>...&nbsp;
        </button>;

        const listDropdown = useMemo(() => 
            <CurrencyList activeCode={variableCode} onClick={onChangeCode}/>,
            [variableCode, onChangeCode]);

        return (
            <div className={`buttons-segmented ${theme.tone}`}>
                { values.map(code => (
                    <button
                        key={code}
                        type="button"
                        className={`button code ${theme.tone} ${theme.color} ${active === code ? 'active': ''}`}
                        onClick={() => onChangeCode(code)}>
                        {code}
                    </button>
                ))}
                <Dropdown 
                    button={buttonDropdown}
                    triggerOnClick={false}>
                    {listDropdown}
                </Dropdown>
            </div>);
}

CurrencyButtons.displayName = 'CurrencyButtons';

export default React.memo(CurrencyButtons);