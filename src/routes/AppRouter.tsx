import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {CustomMap, Sliders, Prompt} from '../views/index';

let AuthSwitch = createSwitchNavigator({
  // Sliders,
  // Prompt,
  CustomMap,
});

let App = createAppContainer(AuthSwitch);
export default App;
