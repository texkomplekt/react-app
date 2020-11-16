import React, {useContext} from 'react';
import {ThemeContext} from '../../components/context/ThemeContext';

const Avatar = () => {
    const theme = useContext(ThemeContext);
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 36 36">
        <circle  fill={theme.tone === 'light' ? '#fff' : '#26282e'} cx="18" cy="18" r="18"/>
        <circle fill={theme.rgbColor} cx="18" cy="14.5" r="3.5"/>
        <path fill={theme.rgbColor}  d="M24.13 22.55v1.14A1.32 1.32 0 0 1 22.81 25h-9.62a1.31 1.31 0 0 1-1.31-1.31v-1.14a3.67 3.67 0 0 1 3.67-3.67H16a4.84 4.84 0 0 0 4 0h.45a3.67 3.67 0 0 1 3.68 3.67z"/>
      </svg>
    )
};

export default Avatar;