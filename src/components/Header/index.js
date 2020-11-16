import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {ThemeContext, themes} from '../context/ThemeContext';
import Dropdown from '../Dropdown';
import Logo from '../../assets/img/Logo';
import Avatar from '../../assets/img/Avatar';
import routes from '../../routes';
import './index.scss';

const Header = ({
    onThemeChange,
}) => {
    const theme = useContext(ThemeContext);

    const themeButton = <button className={`button icon ${theme.tone}`}>&#9788;</button>

    const themeList = <ul className="list">
        { Object.keys(themes).map(key => 
            <li key={key}
                className={`item ${themes[key].title === theme.title ? 'active': ''}`}
                onClick={() => onThemeChange(themes[key])}>{themes[key].title}
            </li>
        )}
    </ul>

    return (
        <header className={`header ${theme.color} ${theme.tone}`}>
            <div className="header-top">
                <a className="header-logo" href="/">
                    <Logo/>
                </a>
                <Avatar/>
            </div>
            <nav className="header-bottom">
                <div>
                    {routes.filter(router => router.inMenu).map(route => (
                        <NavLink
                            key={route.name}
                            to={route.path}
                            className={`header-link`}
                            activeClassName="active">
                            {route.title}
                        </NavLink>
                    ))}
                </div>
                <Dropdown 
                    button={themeButton}
                    triggerOnClick={false}
                    position="right">
                    {themeList}
                </Dropdown>
            </nav>
        </header>
    )
}

Header.displayName = 'Header';

export default Header;