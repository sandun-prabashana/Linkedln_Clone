import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, Dimensions, Button, Alert, TouchableOpacity, lable   } from 'react-native';
import {TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ABC from './ABC'
import Tab from './Tab';
// import SignIn from './SignIn';
import { StackNavigator } from 'react-navigation';


export default class Join extends Component {

    constructor(props) {
        super(props);
        this.state = {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          fullname: '',
          name: true,
          mail: false,
          pass: false,
          nameError:false,
          emailError:false,
          passwordError:false,
          securePassword: true,
          iconName: "eye-off",
        };
        auth().onAuthStateChanged((user) =>{
            if(user){
                console.log('User Display Name: ', user.displayName)
            }
        });
      }



      registerUser = () =>{
        // const passwordLength = this.state.password.length;
        // if(passwordLength > 0){
        // auth()
        // .createUserWithEmailAndPassword(this.state.email, this.state.password)
        // .then((createdUser) => {
        //     createdUser.user.updateProfile({
        //         displayName: this.state.fullname
        //     })

        //     try{
        //         var user= {
        //           email:this.state.email,
        //           password:this.state.password,
        //           name:this.state.fullname,
        //         }
        //          AsyncStorage.setItem('userData',JSON.stringify(user))
                this.props.navigation.navigate('TabScreen')
    //           }catch(error){
    //             console.log(error);
    //           }

    //       console.log('User account created & signed in!');
    //       console.log(createdUser.user)
    //     })
    //     .catch(error => {
    //       if (error.code === 'auth/email-already-in-use') {
    //         console.log('That email address is already in use!');
    //       }
      
    //       if (error.code === 'auth/invalid-email') {
    //         console.log('That email address is invalid!');
    //       }
      
    //       console.error(error);
    //     });
    // }else{
    //     this.setState({ passwordError: true });
    // }
      }


      changeFirstName = (e) => {
          this.setState({ firstname: e });

      }
      changeLastName = (e) => {
          this.setState({ lastname: e });
      }
    
      changeEmail = (e) => {
        this.setState({ email: e });
      }
    
      changePassword = (e) => {
        this.setState({ password: e });
      }

      changeFristView = ()=>{

        const fname = this.state.firstname.length;
        const lname = this.state.lastname.length;

        if(fname > 0 && lname > 0){
            this.setState({ name: false });
            this.setState({ mail: true });
            this.setState({fullname : this.state.firstname+" "+this.state.lastname})
        }else{
            this.setState({ nameError:true });
        }


      }

      changeSecondView = ()=>{

        const emailLength = this.state.email.length;

        if(emailLength > 0){
            this.setState({ mail: false });
            this.setState({ pass: true });
        }else{
            this.setState({ emailError:true });
        }
        
      }

      onPressPasswordEye = () => {
        const eyeName = this.state.iconName;
        if (eyeName == "eye-off") {
          this.setState({ securePassword: false });
          this.setState({ iconName: "eye" });
        }
        if (eyeName == "eye") {
          this.setState({ securePassword: true });
          this.setState({ iconName: "eye-off" });
        }
      }
    
    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                <Image style={styles.logo} source={require('../img/my-icon.png')} />

                {renderIf(this.state.name)(
                <View>
                <Text style ={styles.txtStyle}>Add your name</Text>

                <TextInput
                style={styles.input1}
                label="First name*"
                onChange={(val) => this.changeFirstName(val.nativeEvent.text)}
                underlineColor='#959595'
                selectionColor = '#646464'
                activeUnderlineColor = '#646464'  
                />

                {renderIf(this.state.nameError)(
                <Text style={styles.errortxt}>Please enter your first name</Text>
                )}
            <TextInput
                style={styles.input2}
                label="Last name*"
                onChange={(val) => this.changeLastName(val.nativeEvent.text)}
                underlineColor='#959595'
                selectionColor = '#646464'
                activeUnderlineColor = '#646464'  
                />

                {renderIf(this.state.nameError)(
                <Text style={styles.errortxt}>Please enter your last name</Text>
                )}

            <TouchableOpacity style ={styles.Continuebtn} onPress={() => this.changeFristView()}> 
                <Text style={styles.Continuebtntxt}>
                Continue
                    </Text>
                </TouchableOpacity >
                </View>
            )}
                {renderIf(this.state.mail)(

                    <View>
                        <Text style ={styles.txtStyle}>Add your email or phone</Text>

                            <TextInput
                            style={styles.input1}
                            label="Email or Phone*"
                            onChange={(val) => this.changeEmail(val.nativeEvent.text)}
                            underlineColor='#959595'
                            selectionColor = '#646464'
                            activeUnderlineColor = '#646464'  
                            />

                {renderIf(this.state.emailError)(
                <Text style={styles.errortxt}>Please enter your email address or phone number</Text>
                )}

                <TouchableOpacity style ={styles.Continuebtn} onPress={() => this.changeSecondView()}> 
                <Text style={styles.Continuebtntxt}>
                Continue
                    </Text>
                </TouchableOpacity >
                    </View>
                )}

                {renderIf(this.state.pass)(

                    <View>

                        <Text style ={styles.txtStyle}>Set your password</Text>

                        <TextInput
                        style={styles.input1}
                        label="Email or Phone*"
                        value={this.state.email}
                        onChange={(val) => this.changeEmail(val.nativeEvent.text)}
                        underlineColor='#959595'
                        selectionColor = '#646464'
                        activeUnderlineColor = '#646464'  
                        />

                        <TextInput
                        style={styles.input2}
                        label="Password*"
                        onChange={(val) => this.changePassword(val.nativeEvent.text)}
                        underlineColor='#959595'
                        selectionColor = '#646464'
                        activeUnderlineColor = '#646464'
                        secureTextEntry={this.state.securePassword}  
                        />

            <TouchableOpacity style={{ zIndex: 99, right: 20  , position: 'absolute' }} onPress={this.onPressPasswordEye}>
              <Icon style ={{top:220, right: 10,}}name={this.state.iconName} size={23} color="#646464" />
            </TouchableOpacity>

            {renderIf(this.state.passwordError)(
            <Text style={styles.errortxt}>Please enter a password</Text>
            )}



                <View style={styles.div3}>
              <Text style={{ color: 'gray', fontSize: 13 }}>6 or more characters</Text>
            </View>
            <View style={styles.div4}>
              <Text style={styles.txtagree}>
                By clicking Agree & Join, You agree to the LinkedIn <Text style={styles.fontChange}>User Agreement, Privacy Policy,</Text> and<Text style={styles.fontChange}>  Cookie Policy</Text>.For phone number signups we will send a verification code via SMS.
              </Text>

              
            </View>
            
            <TouchableOpacity style ={styles.Continuebtn} onPress={this.registerUser}> 
                <Text style={styles.Continuebtntxt}>
                Agree & Join
                    </Text>
                </TouchableOpacity >
                    </View>   


                )}


            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      paddingTop: 22,
      backgroundColor : 'white',
      height
    },
    logo: {
      width: 85,
      height: 21,
      marginLeft : 20,
    },
    color : {
        backgroundColor: "transparent" // This works
    },
    input1: {
        fontSize: 20,
        backgroundColor: "transparent",
        marginLeft : 20,
        marginTop:30,
        marginRight :20,
      },
      input2: {
        fontSize: 20,
        backgroundColor: "transparent",
        marginLeft : 20,
        marginTop : 5,
        marginRight :20,
      },

      txtStyle : {
        fontSize : 35,
        color : 'black',
        fontWeight : 'bold',
        marginLeft : 20,
        marginTop:50

      },

      Continuebtn:{
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor : '#0b66c3',
        height : 50,
        width:350,
        borderRadius: 50,
        marginTop:30
        },

        Continuebtntxt:{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color : 'white',
            fontSize : 20,
            fontWeight : 'bold'
          },

          div3: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            flexDirection: 'row',
            marginLeft: 20,
            marginTop: 10,
        
          },
          div4: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            flexDirection: 'row',
            marginLeft: 20,
            marginTop: 10,
        
          },
          txtagree: {
            color: '#333333',
            fontSize: 12
          },
          fontChange: {
            color: '#0a66c2',
            fontWeight: 'bold',
        
          },

          errortxt:{
            marginTop : 10,
            marginLeft: 20,
            color : 'red',
            fontWeight : 'bold',
          },

});