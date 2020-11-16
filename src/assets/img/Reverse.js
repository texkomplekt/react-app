import React, {useContext} from 'react';
import {ThemeContext} from '../../components/context/ThemeContext';

const Reverse = () => {
    const theme = useContext(ThemeContext);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.2 489.2" width={24} height={24}>
            <path fill={theme.rgbColor} d="M365.55 485.6c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l94.5-94.5c4.8-4.8 4.8-12.5 0-17.3l-94.5-94.5c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l73.6 73.6H20.35c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h418.8l-73.6 73.5c-4.8 4.8-4.8 12.6 0 17.3zM106.25 3.6l-94.5 94.5c-4.8 4.8-4.8 12.5 0 17.3l94.5 94.5c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6c4.8-4.8 4.8-12.5 0-17.3L50.05 119h418.8c6.8 0 12.3-5.5 12.3-12.3s-5.5-12.3-12.3-12.3H49.95l73.6-73.5c4.8-4.8 4.8-12.5 0-17.3s-12.6-4.8-17.3 0z7"/>
        </svg>
    )
};

export default Reverse;





