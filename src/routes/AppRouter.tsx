import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  CustomMap,
  IntroSliders as Sliders,
  Prompt,
  Account,
  Login,
  SelectLanguage,
  FillInfo,
  Loader,
  History
} from '../views/index';
import { createStackNavigator } from 'react-navigation-stack';
import InnerHeader from '../components/InnerHeader';
import { strings } from '../locales/strings';

let PromptStack = createStackNavigator(
  {
    Sliders,
    Prompt,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

let AuthorizedStack = createStackNavigator({
  SelectLanguage: {
    screen: SelectLanguage,
    navigationOptions: {
      header: props => (
        <InnerHeader
          transparent
          {...props}
          title={strings.language}
        />
      ),
    },
  },
  FillInfo: {
    screen: FillInfo,
    navigationOptions: {
      header: props => (
        <InnerHeader
          transparent
          back
          {...props}
          title={strings.userInfo}
        />
      ),
    },
  },
})

let Main = createStackNavigator(
  {
    CustomMap,
    Account: {
      screen: Account,
      navigationOptions: {
        header: ({ navigation, ...rest }) => (
          <InnerHeader back="CustomMap" back {...rest} navigation={navigation} />
        ),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        header: ({ navigation, ...rest }) => (
          <InnerHeader back="CustomMap" back {...rest} navigation={navigation} />
        ),
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

let AuthSwitch = createSwitchNavigator({
  Loader,
  PromptStack,
  Login,
  AuthorizedStack,
  Main,
});

let App = createAppContainer(AuthSwitch);
export default App;
