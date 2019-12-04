import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  CustomMap,
  IntroSliders as Sliders,
  Prompt,
  Account,
  Login,
  SelectLanguage,
  FillInfo,
} from '../views/index';
import {createStackNavigator} from 'react-navigation-stack';
import InnerHeader from '../components/InnerHeader';
import {strings} from '../locales/strings';

let AuthStack = createStackNavigator(
  {
    Sliders,
    Prompt,
    Login,
    SelectLanguage: {
      screen: SelectLanguage,
      navigationOptions: {
        header: props => (
          <InnerHeader
            transparent
            back="Login"
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
            back="SelectLanguage"
            {...props}
            title={strings.userInfo}
          />
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
let Stacks = createStackNavigator(
  {
    CustomMap,
    Account: {
      screen: Account,
      navigationOptions: {
        header: ({navigation, ...rest}) => (
          <InnerHeader back="CustomMap" {...rest} navigation={navigation} />
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
  AuthStack,
  Stacks,
});

let App = createAppContainer(AuthSwitch);
export default App;
