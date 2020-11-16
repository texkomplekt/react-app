import React, {useState, Suspense} from 'react';
import { Redirect, Route, Switch, Router} from 'react-router-dom';
import {ThemeContext, themes} from './components/context/ThemeContext.js';
import routes from './routes';
import Header from './components/Header';
import { createBrowserHistory } from "history";
import './styles/app.scss';

const history = createBrowserHistory();

function App() {
  const initTheme =
    localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : themes.darkBlue;
  
  const [theme, setTheme] = useState(initTheme);

  const onThemeChange = (theme) => {
    localStorage.setItem('theme', JSON.stringify(theme));
    setTheme(theme);
  }

  return (
    <div className={`app ${theme.tone}`}>
      <ThemeContext.Provider value={theme}>
          <Router history={history}>
          <Header onThemeChange={onThemeChange}/>
          <main className={`main ${theme.tone}`}>
              <Suspense fallback={<div/>}>
                  <Switch>
                      {routes.map((item, index) => [
                          item.default
                          && (
                              <Route
                                  path="/"
                                  exact
                                  key={-1}
                                  component={() => <Redirect to={item.path} />}
                                  props={item.props}
                              />
                          ),
                          <Route
                              path={item.path}
                              key={index}
                              component={item.view}
                              props={item.props}
                          />,
                      ])}
                    </Switch>
                </Suspense>
            </main>
            </Router>
        </ThemeContext.Provider>
    </div>
  );
}

App.displayName = 'App';

export default App;
