import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import CurrencyInfo from '../CurrencyInfo';
import CurrensyChart from '../CurrencyChart';
import { API } from '../../Connection';
import { getDeltaDay } from '../../lib/date';
import './index.scss';

const Charts = ({infoItems, dispatch}) => {

    useEffect(() => {
        Object.keys(infoItems)
            .forEach(id => {
                API.history({
                        start_at: getDeltaDay(infoItems[id].date),
                        end_at: infoItems[id].date,
                        base: infoItems[id].base,
                        symbols: infoItems[id].code
                    }).then(data => dispatch({
                            type: 'UPDATE_VALUE',
                            data: {id: id, value: Object.values(Object.values(data.rates)[0])[0]}}
                    )).catch(() => {});
                })
    }, []);

    return (
        <section className="charts">
            {infoItems && Object.entries(infoItems)
                .map((el) => Object.assign(el[1], {id: el[0]}))
                .map(currency => (
                <CurrencyInfo
                    key={`${currency.id}`}
                    data={currency}
                    editable={true}
                    onChange={()=>{}}/>
            ))}
            <CurrensyChart/>
        </section>
    )
}

Charts.displayName = 'Charts';

const mapStateToProps = state => ({infoItems: state.infoState});

export default connect(mapStateToProps)(Charts);

