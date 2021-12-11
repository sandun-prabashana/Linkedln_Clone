import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import SignIn from './SignIn';
import Join from './Join';

const RootStack = createStackNavigator();

export default class RootNavigator extends Component {
  render() {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="Join" component={Join} />
      </RootStack.Navigator>
    );
  }
}