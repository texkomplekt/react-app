import { dateNow } from '../lib/date';



const INITIAL_STATE = {   
    currency1: {
        base: 'EUR',
        code: 'RUB',
        date: dateNow,
        value: 0,
    },
    currency2: {
        base: 'EUR',
        code: 'USD',
        date: dateNow,
        value: 0,
    },
    currency3: {
        base: 'USD',
        code: 'RUB',
        date: dateNow,
        value: 0,
    },
    currency4: {
        base: 'RUB',
        code: 'CHF',
        date: dateNow,
        value: 0,
    },
    currency5: {
        base: 'HKD',
        code: 'RUB',
        date: dateNow,
        value: 0,
    },
    currency6: {
        base: 'RUB',
        code: 'ZAR',
        date: dateNow,
        value: 0,
    },
};
   
function infoReducer(state = INITIAL_STATE, action) {
    const res = {...state};
    switch(action.type) {
        case 'ADD_DATA':
            const i = Object.keys(state).length; 
            const {base, date, code, value} = action.data;
            res[`currency${i + 1}`] = {
                base: base,
                date: date,
                code: code,
                value: Math.floor(value * 1000) / 1000,
            };
            return res;
        case 'UPDATE_VALUE':
            res[action.data.id].value = Math.floor(action.data.value * 1000) / 1000;
            return res; 
        case 'UPDATE_DATA':
            res[action.data.id] = action.data;
            return res;
        case 'DELETE_DATA':
            delete res[action.data];
            return res;           
        default:
            return state;
    }
  }
   
  export default infoReducer;