
import React from 'react';
import { View, Image, StyleSheet, SafeAreaView  ,Text, Dimensions, Button, Alert, TouchableOpacity   } from 'react-native';
import ViewSlider from 'react-native-view-slider'
import Join from './Join'
import SignIn from './SignIn'
import Tab from './Tab';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '978992527612-idaq40sosncbftmi079fa1nlvdtms2hj.apps.googleusercontent.com',
});



const { width, height } = Dimensions.get('window');


// var [ isPress, setIsPress ] = React.useState(false);

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor : 'white',
    height
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 85,
    height: 21,
    marginLeft : 20,
  },
  viewBox: {
    paddingTop: 250,
    justifyContent: 'center',
    width: width,
    padding: 0,
    alignItems: 'center',
    height: 150
},
slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    
},
dotContainer: {
  backgroundColor: 'transparent',
  position: 'absolute',
  bottom: 15
},

joinbtn:{
alignSelf: 'center',
justifyContent: 'center',
backgroundColor : '#0b66c3',
height : 45,
width:350,
borderRadius: 50,
marginBottom:10
},

joinbtntxt:{
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color : 'white',
  fontSize : 20,
  fontWeight : 'bold'
},

joinwithgooglebtn:{
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor : 'white',
  height : 45,
  width:350,
  borderRadius: 50,
  borderWidth:1,
  marginBottom:10
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

  signinbtn:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor : 'white',
    height : 45,
    width:350,
    borderRadius: 50,
    marginBottom:10
    },

    signinbtntxt:{
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color : '#1d5b9d',
      fontSize : 20,
      fontWeight : 'bold'
    
    },
});


const joinNow =(navigation)=> {
  
  navigation.navigate('Join');
}

  const DisplayAnImage = ({ navigation }) => {


    const onGoogleButtonPress=async()=>{
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }


  return (
    <SafeAreaView  style={styles.container}>

      <Image style={styles.logo} source={require('../img/my-icon.png')} />

      <ViewSlider 
      ref={scrollView => this._scrollView = scrollView}
        renderSlides = {
          <>
            <View style={styles.viewBox}>
              <Image source={require('../img/1.jpg')} style={{height: 600, width}}/>
            </View>
            <View style={styles.viewBox}>
              <Image source={require('../img/2.jpg')} style={{height: 600, width}}/>
            </View>
            <View style={styles.viewBox}>
              <Image source={require('../img/3.jpg')} style={{height: 600, width}}/>
            </View>
         </>
      }
      style={styles.slider}     //Main slider container style
      height = {550}    //Height of your slider
      slideCount = {3}    //How many views you are adding to slide
      dots = {true}     // Pagination dots visibility true for visibile 
      dotActiveColor = 'blue'     //Pagination dot active color
      dotInactiveColor = 'gray'    // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
      autoSlide = {true}    //The views will slide automatically
      slideInterval = {1000}    //In Miliseconds  
     />

      <TouchableOpacity style ={styles.joinbtn} onPress={() => joinNow(navigation)}> 
       <Text style={styles.joinbtntxt}>
       Join now
        </Text>
      </TouchableOpacity >

      
      <TouchableOpacity style ={styles.joinwithgooglebtn} onPress={() => onGoogleButtonPress() }> 
      <View style={styles.googlelogoView}>
      <Image style={styles.googlelogo} source={require('../img/google-logo-9822.png')} />
       <Text style={styles.joinwithgooglebtntxt}>
       Join with Google
      </Text>
      </View>
      </TouchableOpacity >

      <TouchableOpacity style ={styles.signinbtn} onPress={() => navigation.navigate('SignIn')}> 
       <Text style={styles.signinbtntxt}>
       Sign in
        </Text>
      </TouchableOpacity >

    </SafeAreaView >
  );
}

export default DisplayAnImage;