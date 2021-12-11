import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from './screens/Home'
import SignIn from './screens/SignIn'
import Join from './screens/Join'
import Post from './screens/Post';
import TabScreen from './screens/TabScreen';
import SplashScreen from './screens/SplashScreen';
import detailScreen from './screens/detailScreen';
import a from './screens/a';


const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

export default class App extends Component {




  

  render() {

    function FirstComponent() {
      return (
        <NavigationContainer independent={true}> 
          <Stack.Navigator>
              <Stack.Screen options={{headerShown: false}} name="SplashScreen" component={a} />
              <Stack.Screen options={{headerShown: false}} name="Join" component={Join} />
              <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
              <Stack.Screen options={{headerShown: false}} name="Post" component={Post} />
              <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
              <Stack.Screen options={{headerShown: false}} name="TabScreen" component={TabScreen} />
              <Stack.Screen options={{headerShown: false}} name="detailScreen" component={detailScreen} />
              </Stack.Navigator>
        </NavigationContainer>

        
      );
    }

    return (
  
    <FirstComponent/>

    );
  }

}


