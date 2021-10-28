import {getTheme, globalCss, i18n, provider, ProviderComposer} from "../src/common-resources";
import {GlobalStyles, ThemeProvider as MuThemeProvider} from "@mui/material";
// import {LocalizationProvider} from '@mui/lab';
import {I18nextProvider} from "react-i18next";
import {Provider} from "react-redux";
import StoryRouter from 'storybook-react-router';
import {ThemeProvider} from "@emotion/react";
import configureStore from "./configureStore";
import {setLanguage, setTheme} from "../src/stores";
// import { withThemes } from '@react-theming/storybook-addon';

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
  backgrounds: {
    default: 'dark',
    values: [
      {name: 'dark', value: 'hsl(207, 26%, 17%)'},
      {name: 'light', value: 'hsl(0, 0%, 98%)'},
    ],
  },
}
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'zh_CN',
    toolbar: {
      icon: 'globe',
      items: [
        {value: 'en_US', right: 'en_US', title: 'English'},
        {value: 'zh_CN', right: 'zh_CN', title: '中文'},
      ],
    },
  },

}
const store = configureStore();
// const themingDecorator = withThemes(ThemeProvider, [theme]);

export const decorators = [
  (Story, context) => {
    const {backgrounds, locale} = context.globals;
    // const themingDecorator = withThemes(ThemeProvider, [theme]);
    const themeMode = backgrounds && backgrounds.value === '#ffffff' ? 'light' : 'dark';
    store.dispatch(setLanguage(locale));
    store.dispatch(setTheme(themeMode));
    // store.dispatch(imageConfig)
    // const theme = getTheme(store.getState().settings.themeMode);

    // store.dispatch(setCoinJson(imgConfig.frames))

    // let url = "http://static.loopring.io/assets/images/coin/loopring.json";
    // fetch(url)
    //   .then(res => res.json()).then(imgConfig => {
    //   // @ts-ignore
    //   // setCoinJsonimgConfig.frames
    //     store.dispatch(setCoinJson(imgConfig.frames))
    //   }
    //
    //  )

// const language = getTheme(store.getState().settings.language);
    StoryRouter();
    return <ProviderComposer providers={[
      // provider(LocalizationProvider, {dateAdapter: DateAdapter}),
      provider(I18nextProvider, {i18n: i18n}),
      provider(MuThemeProvider, {theme: getTheme(themeMode)}),
      provider(ThemeProvider, {theme: getTheme(themeMode)}),
      provider(Provider, {store}),
    ]}>
      <style type="text/css">
        {`.sb-show-main.sb-main-padded{
            padding:0.01em;  
          }
        `}
      </style>
      <GlobalStyles styles={globalCss({theme:getTheme(themeMode)})}></GlobalStyles>
      <Story {...{context}} > </Story>
    </ProviderComposer>

  }
]