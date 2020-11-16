import React from 'react';
import CurrencyTable from '../CurrencyTable';
import Calculator from './../Calculator';
import './index.scss';
import '../../styles/header.scss';

const Currency = () => {
    return (
        <section className="currency">
            <Calculator/>
            <CurrencyTable/>
        </section>
    )
}

Currency.displayName = 'Currency';

export default React.memo(Currency);

