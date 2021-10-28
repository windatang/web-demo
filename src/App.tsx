import React from 'react';
import { css, Theme, useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import store, { setLanguage } from './stores';
import { HashRouter as Router, useLocation } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import { globalCss } from './common-resources';
import RouterView from 'routers';
import { useInit } from 'hook';

// import logo from './logo.svg';

const ScrollToTop = () => {
  const {pathname} = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const App = () => {
  const theme: Theme = useTheme();
  const {i18n: {language}} = useTranslation()
  const storeLan = store.getState().settings.language


  React.useEffect(() => {
    if (storeLan !== language) {
      store.dispatch(setLanguage(language));
    }
  }, [])

  const {state} = useInit();
  const GlobalStyle =  React.useMemo(()=><GlobalStyles styles={css`
      ${globalCss({theme})};

      body {
        ${theme.mode === 'dark' ? `
            color: ${theme.colorBase.textPrimary};
          ` : ``}
      }

      body:before {
        ${theme.mode === 'dark' ? `
            background: var(--color-global-bg);
       ` : ''}
      }
    }`}/>,[theme])

  return <>
    {GlobalStyle}
    <Router>

      <ScrollToTop/>
      <RouterView state={state}/>
    </Router>

  </>


}
export default App;
