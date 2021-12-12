import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, Dimensions, Button, Alert, TouchableOpacity, lable, StatusBar   } from 'react-native';
import {TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart';
const {width, height} = Dimensions.get('window');
import { getAuth, signOut } from "@react-native-firebase/auth";



export default class Setting extends Component {


sign = async () =>{
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
    RNRestart.Restart();
}

    render() {
        return (
            <View style={styles.mainView}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
    
            <View style={styles.topView}>
            <Icon
                  name="arrow-back"
                  size={30}
                  style={{marginLeft: 10, marginTop: 8}}
                  onPress={()=>this.props.navigation.navigate('ProfileScreen')}
                />
                <Text style={{
                    color:'black',
                    fontWeight:'bold',
                    fontSize:20,
                    marginTop:10,
                    marginLeft:30,
                }}>Settings</Text>
            </View>
            <View style={styles.break1}></View>
            <TouchableOpacity style={styles.signOut} onPress={()=>this.sign()}>
                <Text style={styles.signOut} >Sign Out</Text>
            </TouchableOpacity>
            <View style={styles.break}></View>
            <Image style={styles.logo} source={require('../img/my-icon.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
      backgroundColor: '#e9e6de',
      height: height,
    },
    topView: {
      flexDirection: 'row',
      backgroundColor: 'white',
      width: width,
      height: 50,
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    logo: {
        width: 85,
        height: 21,
        bottom:20,
        alignSelf:'center',
        position:'absolute'
      },
      break:{
        position:'absolute',
        alignSelf:'center',
        width:width-40,
        backgroundColor:'#959595',
        height:1,
        bottom:60,
    },
    signOut:{
        color:'black',
        fontSize:15,
        fontWeight:'bold',
        position:'absolute',
        bottom:40,
        left:10
    },
    break1:{
        position:'absolute',
        alignSelf:'center',
        width:width-40,
        backgroundColor:'#959595',
        height:1,
        bottom:115,
    },
})