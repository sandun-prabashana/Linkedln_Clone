import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator,Alert, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Validation, Sizer } from 'rn-core-utils';
import renderIf from 'render-if';
import Join from './Join'
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '978992527612-idaq40sosncbftmi079fa1nlvdtms2hj.apps.googleusercontent.com',
});

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          validemail: false,
          validpassword: false,
          securePassword: true,
          emailError:false,
          passwordError:false,
          iconName: "eye-off"
        };
    
      }

      changeEmail = (e) => {
        this.setState({ email: e });
      }

      changePassword = (e) => {
        this.setState({ password: e });
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

      onGoogleButtonPress=async()=>{
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }

      userlogin =()=>{
        const emailLength = this.state.email.length;
        const passwordLength = this.state.password.length;

        if(emailLength>0){
          if(passwordLength>0){
            auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then((user)=>{
                console.log(user);
                console.log('user loged');
            })
            .catch(error =>{
                console.log('login unsuccessfull ')
            });
          }else{
            this.setState({ passwordError:true });
          }
        }else{
          this.setState({ emailError:true });
        }


    }

    render() {

        const Joinnow = () => {
            this.props.navigation.navigate('Join')
          }

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                
                <View style={styles.row1}>
                <Image style={styles.logo} source={require('../img/my-icon.png')} />

                <TouchableOpacity style={{ width: '60%', alignItems: 'flex-end' }} onPress={() => {
                Joinnow()
                }}>
                <Text style={{ color: '#0a66c2', fontSize: 16, fontWeight : 'bold' }}>Join now</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.divSignin}>
                <Text style={styles.txtSignin}>Sign in</Text>
                </View>

                <TextInput
                style={styles.input1}
                label="Email or Phone"
                onChange={(val) => this.changeEmail(val.nativeEvent.text)}
                underlineColor='#959595'
                selectionColor = '#646464'
                activeUnderlineColor = '#646464'  
                />

            {renderIf(this.state.emailError)(
            <Text style={styles.errortxt}>Please enter a email</Text>
            )}

                <View>
                <TextInput
                style={styles.input1}
                label="Password"
                onChange={(val) => this.changePassword(val.nativeEvent.text)}
                secureTextEntry={this.state.securePassword}
                underlineColor='#959595'
                selectionColor = '#646464'
                activeUnderlineColor = '#646464'  
                />

          {renderIf(this.state.passwordError)(
            <Text style={styles.errortxt}>Please enter a password</Text>
            )}

            <TouchableOpacity style={{ zIndex: 99, right: 20  , position: 'absolute' }} onPress={this.onPressPasswordEye}>
              <Icon style ={{top:28, right: 10,}}name={this.state.iconName} size={23} color="#646464" />
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginLeft: 20, marginTop: 15 }} >
            <Checkbox />
            <Text style={{ color: 'black', marginLeft: 1 }}>Remember me.</Text>
            <TouchableOpacity>
              <Text style={{ color: '#0a66c2', marginLeft: 5 }}>Learn more</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnforgetbox} mode="text"
          >
            <Text style={styles.forget}>Forget Password ?</Text>

            </TouchableOpacity>

            <TouchableOpacity style ={styles.Continuebtn} onPress={this.userlogin}> 
       <Text style={styles.Continuebtntxt}>
       Continue
        </Text>
      </TouchableOpacity >



      <View style={styles.dashbox}>
            <View style={styles.dash} />
            <Text style={styles.dashtxt}>or</Text>
            <View style={styles.dash} />
          </View>


          <TouchableOpacity style ={styles.joinwithgooglebtn} onPress={this.onGoogleButtonPress}> 
      <View style={styles.googlelogoView}>
      <Image style={styles.googlelogo} source={require('../img/google-logo-9822.png')} />
       <Text style={styles.joinwithgooglebtntxt}>
       Sign in with Google
      </Text>
      </View>
      </TouchableOpacity >

      <TouchableOpacity style ={styles.joinwithgooglebtn} onPress={() => Alert.alert('Simple Button pressed')}> 
      <View style={styles.googlelogoView}>
      <Image style={styles.googlelogo} source={require('../img/png-apple-logo-9708.png')} />
       <Text style={styles.joinwithgooglebtntxt}>
       Sign in with Apple
      </Text>
      </View>
      </TouchableOpacity >

            </SafeAreaView>
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
        fontSize: 15,
        backgroundColor: "transparent",
        marginLeft : 20,
        marginTop:0,
        marginRight :20,
        
        
      },
      input2: {
        fontSize: 15,
        backgroundColor: "transparent",
        marginLeft : 20,
        marginTop : 0,
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
        marginTop:20
        },

        Continuebtntxt:{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color : 'white',
            fontSize : 20,
            fontWeight : 'bold'
          },

          row1:{
                
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
            
              },
          divSignin: {
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
                },

          txtSignin: {
            fontSize: 34,
            fontWeight: 'bold',
            marginLeft: 20,
            color: 'black',
            marginTop :30,
                },

        forget:{
                color: '#0a66c2',
                fontFamily: 'lucida grande',
                fontSize: 14,
                fontWeight : 'bold'
              },

              btnforgetbox: {
                marginTop: 20,
                marginLeft :28,
                width: '70%',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                color: '#0a66c2'
              },

              dash: {
                width: 165,
                margin: 10,
                height: 1,
                backgroundColor: 'gray',
                opacity: 0.3
              },
              dashbox: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 12
              },
              dashtxt: {
                color: 'black',
                opacity: 0.7
              },

              joinwithgooglebtn:{
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor : 'white',
                height : 45,
                width:350,
                borderRadius: 50,
                borderWidth:1,
                marginBottom:5,
                marginTop : 10
                },
              
                joinwithgooglebtntxt:{
                  color : '#5b5b5b',
                  fontSize : 20,
                  marginTop :4,
                  fontWeight : 'bold'
                },
              
                googlelogo:{
                  width:30,
                  height:30,
                  marginRight:10,
                  position : 'relative',
                  
                },
              
                googlelogoView:{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  flexDirection:'row',
                  width:190
                },

                errortxt:{
                  marginTop : 10,
                  marginLeft: 20,
                  color : 'red',
                  fontWeight : 'bold',
                },


});