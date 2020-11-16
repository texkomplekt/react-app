import {fetchApi} from './connector';
import Url from 'url';


class Api {
    convert() {
        const url = Url.format({
            pathname: 'https://api.exchangeratesapi.io/latest',
        });
        return fetchApi(url);
    }
    latest(params) {
        const url = Url.format({
            pathname: 'https://api.exchangeratesapi.io/latest',
            query: {
                ...params,
            },
        });
        return fetchApi(url);
    }
    history(params) {
        const url = Url.format({
            pathname: 'https://api.exchangeratesapi.io/history',
            query: {
                ...params,
            },
        });
        return fetchApi(url);
    }

}

export const API = new Api();


