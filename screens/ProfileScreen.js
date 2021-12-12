import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, Dimensions, Button, Alert, TouchableOpacity, lable, StatusBar   } from 'react-native';
import {TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const {width, height} = Dimensions.get('window');
export default class ProfileScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
          name:'',
        };
      }


componentDidMount(){
    this.setState({ name: auth().currentUser.displayName });
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
                  onPress={()=>this.props.navigation.navigate('TabScreen')}
                />
              

              <View style={styles.search}>
                <Icon2
                  name="search"
                  size={15}
                  style={{marginLeft: 10, marginTop: 8}}
                />
                <TextInput style={styles.input} placeholder="Search" 
                underlineColor='black'
                selectionColor = 'black'
                activeUnderlineColor = 'black'
                value={this.state.name}
                />
              </View>
              <Icon
                name="settings-sharp"
                size={25}
                style={{marginLeft: 30, marginTop: 13,color:'black'}}
                onPress={()=>this.props.navigation.navigate('Setting')}
              />
            </View>

            <View>
            <Image style={styles.back} source={require('../img/my-icon.png')} />
            <Image
          style={styles.profilepicture}
          source={{
            uri: auth().currentUser.photoURL,
          }}
        />
            </View>

            <Text style={styles.name}>{this.state.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
      backgroundColor: 'white',
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
    Profile: {
      width: 30,
      height: 30,
      borderRadius: 100,
      marginTop: 10,
      marginLeft: 10,
      resizeMode: "cover",
    },
    search: {
      backgroundColor: 'white',
      width: 250,
      height: 30,
      marginTop: 10,
      marginLeft: 20,
      borderRadius: 5,
      flexDirection: 'row',
    },
    input: {
      backgroundColor: 'white',
      fontSize: 15,
      marginTop: 1,
      marginLeft: 10,
      width: 200,
      height: 32,
    },
    back:{
        resizeMode: "contain",
        width:width,
        height:120,
    },
    profilepicture:{
        width:150,
        height:150,
        borderRadius:100,
        borderWidth:1,
        position:'absolute',
        top:30,
        left:20,
    },
    name:{
        color:'black',
        fontSize:30,
        fontWeight:'bold',
        marginTop:70,
        marginLeft:20,
    }
})