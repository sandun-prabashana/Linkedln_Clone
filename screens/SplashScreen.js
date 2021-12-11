import React, { Component } from 'react'
import { Text, View ,TouchableOpacity, StatusBar, StyleSheet, Image,Dimensions, Animated , SafeAreaView} from 'react-native'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AnimatedSplash from "react-native-animated-splash-screen";
import TabScreen from './TabScreen';
import Home from './Home';

const { width, height } = Dimensions.get('window');

export default class SplashScreen extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
        };
      }


 

    componentDidMount() {
        this.getSavedStorage()
      }

      getSavedStorage=()=> {
        try{
            AsyncStorage.getItem('userData').then(value=>{
                if (value!=null) {
                  let user=JSON.parse(value)
                    this.setState({ email: user.email });
                    this.setState({ password: user.password });
                    this.getDataToFirebase()
                }else{
                  setTimeout(() => {
                    this.changeLoadingState();
                    this.props.navigation.navigate('Home')
                  }, 2000);
                }
            })
    
        }catch(error){
         console.log(error);
        }
    }
    
    getDataToFirebase=()=> {
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => { 
        console.log(user);
        console.log('login succes');
        setTimeout(() => {
            this.changeLoadingState();
          this.props.navigation.navigate('TabScreen')
        }, 10000);
      })
      .catch(error => {
        this.changeLoadingState();
        this.props.navigation.navigate('Home')
      });
    }

    changeLoadingState = () => {
        this.setState({ isLoaded: false });

    }



    render() {

        return (

        <SafeAreaView  style={styles.mainView}>
            
            <Image style={styles.logo} source={require('../img/my-icon.png')} />
        </SafeAreaView >
          

        );
      }
}

const styles = StyleSheet.create({


    mainView:{
        backgroundColor:'white',
        width:width,
        height:height,
        justifyContent: 'center',
    },
    logo:{
        alignSelf:'center',
        height:150,
        width:150,
        resizeMode: "contain",
        justifyContent: 'center',
    }

})
