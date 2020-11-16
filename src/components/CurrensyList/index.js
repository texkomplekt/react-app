import React, {useState, useContext, useEffect} from 'react';
import currency from '../../lib/currency';
import {ThemeContext} from '../context/ThemeContext';
import {API} from '../../Connection';
import './index.scss';

const CurrencyList = ({
    width=250,
    onClick,
    activeCode,
}) => {
    const theme = useContext(ThemeContext);
    const [codes, setCodes] = useState([]);
    const [active, setActive] = useState(activeCode);
    
    const onItemClick = (code) => {
        setActive(code);
        onClick(code);
    };
  
    useEffect(() => {
        API.latest()
          .then((data) => setCodes(Object.keys(data.rates)))
          .catch(() => {});
    }, []);

    return (<ul 
      className={`list ${theme.tone} ${theme.color} currency-list`}
      style={{width: `${width}px`}}>
      {codes.map((code) => (
        <li 
          className={`item ${active === code ? 'active' : ''}`}
          onClick={() => onItemClick(code)}
          key={code}>
          <span>{currency[code]}</span>
          <span>{code}</span>
        </li>
      ))}
      </ul>
    )
}

CurrencyList.displayName = 'CurrencyList';

export default React.memo(CurrencyList);