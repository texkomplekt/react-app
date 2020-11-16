import { lazy } from 'react';

export default [
    {
        default: true,
        name: 'charts',
        path: '/charts',
        title: 'Котировки',
        inMenu: true,
        view: lazy(() => import('./components/Charts')),
    },
    {
        name: 'add-currency',
        path: '/currency/settings/new',
        title: 'Создать',
        view: lazy(() => import('./components/CurrencyInfoSettings')),
    },
    {
        name: 'info-settings',
        path: '/currency/settings/edit/:id',
        title: 'Редактировать',
        view: lazy(() => import('./components/CurrencyInfoSettings')),
    },
    {
        name: 'currency',
        path: '/currency',
        title: 'Калькулятор валюты',
        inMenu: true,
        view: lazy(() => import('./components/Currency')),
    },
];