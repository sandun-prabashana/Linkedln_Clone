import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedSplash from 'react-native-animated-splash-screen';
import TabScreen from './TabScreen';
import Home from './Home';

const {width, height} = Dimensions.get('window');

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getSavedStorage();
  }

  getSavedStorage = () => {
    if (auth().currentUser != null) {
      console.log('user sign in');
      setTimeout(() => {
        this.changeLoadingState();
        this.props.navigation.navigate('TabScreen');
      }, 1000);
    } else {
      setTimeout(() => {
        this.changeLoadingState();
        this.props.navigation.navigate('Home');
      }, 1000);
      console.log('user sign out');
    }
  };




  changeLoadingState = () => {
    this.setState({isLoaded: false});
  };

  render() {
    return (
      <SafeAreaView style={styles.mainView}>
        <Image style={styles.logo} source={require('../img/my-icon.png')} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    width: width,
    height: height,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});
