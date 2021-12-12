import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
  lable,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class detailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Add Profile Picture',
      name: '',
      location: '',
      imagepath: null,
      imagename: '',
      imageurl: '',
      locationScreen: true,
      PhotoScreen: false,
      Icon: false,
      photo: false,
      add: false,
      ok: false,
      spinner: false,
      email: '',
      password: '',
      fullname: '',
      oldemail:'a@gmail.com',
      oldpassword:'123456'
    };
  }

  userlogin =()=>{
    auth()
    .signInWithEmailAndPassword(this.state.oldemail,this.state.oldpassword)
    .then((user)=>{
        console.log(user);
        console.log('user loged');
    })
    .catch(error =>{
        console.log('login unsuccessfull ')
    });
}

  componentDidMount(){
    this.getSavedStorage()
    this.userlogin();
  }

  getSavedStorage=()=> {
    try{
        AsyncStorage.getItem('userData').then(value=>{
            if (value!=null) {
              let user=JSON.parse(value)
                this.setState({ email: user.email });
                this.setState({ password: user.password });
                this.setState({ fullname: user.name });
                console.log(this.state.email)
                console.log(this.state.password)
                console.log(this.state.fullname)
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

  changeLocation = e => {
    this.setState({location: e});
  };

  changeLocationScreen = () => {
    this.setState({locationScreen: false});
    this.setState({PhotoScreen: true});
    this.setState({Icon: true});
    this.setState({add: true});
  };

  getImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      this.setState({
        imagepath: image.path,
      });
      this.setState({
        imagename: image.modificationDate,
      });
      console.log(this.state.imagepath);
      console.log(this.state.imagename);
      this.setState({Icon: false});
      this.setState({photo: true});
      this.setState({add: false});
      this.setState({ok: true});
    });
  };

  uploadImage = async () => {
    this.setState({spinner: true});

    const filename = this.state.imagename + '.jpg';

    const reference = storage().ref(`images/${filename}`);
    await reference.putFile(this.state.imagepath);

    const url = await storage().ref(`images/${filename}`).getDownloadURL();
    console.log(url);
    this.setState({
      imageurl: url,
    });
    console.log("bye "+this.state.imageurl);

    this.AddPost();
    this.registerUser();
  };


  AddPost = async () => {
    await firestore()
      .collection('Post')
      .add({
        UserPic:this.state.imageurl,
        PostUrl: this.state.imageurl,
        UserName: this.state.fullname,
        PostText: this.state.text,
        PostTime: firestore.Timestamp.fromDate(new Date()),
        like: 0,
        comment: 0,
      })
      .then(() => {
        
        this.setState({Location: ''});
        this.setState({spinner: false});
        this.props.navigation.navigate('TabScreen');
        console.log('post added!');
        auth().signOut()
      })
      .catch(error => {
        console.log('something went wrong !!');
      });
  };

        registerUser = () =>{
        const passwordLength = this.state.password.length;
        if(passwordLength > 0){
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
            createdUser.user.updateProfile({
                displayName: this.state.fullname,
                photoURL:this.state.imageurl,
            })

            try{
                var user= {
                  email:this.state.email,
                  password:this.state.password,
                  name:this.state.fullname,
                }
                 AsyncStorage.setItem('userData',JSON.stringify(user))
              }catch(error){
                console.log(error);
              }

          console.log('User account created & signed in!');
          console.log(createdUser.user)
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
    }else{
        this.setState({ passwordError: true });
    }
      }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../img/my-icon.png')} />
        {this.state.spinner && (
          <ActivityIndicator
            style={styles.loading}
            color={'#0b66c3'}
            size="large"
          />
        )}
        {renderIf(this.state.locationScreen)(
          <View style={{height: height}}>
            <Text style={styles.txtStyle}>Confirm your location</Text>
            <Text style={styles.txtStyle2}>
              See people, jobs, and news in your area
            </Text>
            <Text style={styles.txtStyle3}>Location*</Text>

            <TextInput
              style={styles.input}
              onChange={val => this.changeLocation(val.nativeEvent.text)}
              underlineColor="#959595"
              selectionColor="#646464"
              activeUnderlineColor="#646464"
            />

            <TouchableOpacity
              style={styles.Continuebtn}
              onPress={() => this.changeLocationScreen()}>
              <Text style={styles.Continuebtntxt}>Next</Text>
            </TouchableOpacity>
          </View>,
        )}

        {renderIf(this.state.PhotoScreen)(
          <View style={{height: height}}>
            <Text style={styles.txtStyle4}>
              Adding a photo helps people recognize you
            </Text>

            <View style={styles.box}>
              {renderIf(this.state.Icon)(
                <View style={styles.circle}>
                  <Icon name="ios-camera" size={75} style={styles.camera} />
                </View>,
              )}
              {renderIf(this.state.photo)(
                <View style={styles.circle}>
                  <Image
                    source={{
                      uri: this.state.imagepath,
                    }}
                    style={{
                      height: 150,
                      width: 150,
                      alignSelf: 'center',
                      borderRadius: 100,
                    }}
                  />
                </View>,
              )}
              <Text style={styles.name}>{this.state.fullname}</Text>
            </View>

            {renderIf(this.state.add)(
              <TouchableOpacity
                style={styles.Continuebtn}
                onPress={() => this.getImageFromGallery()}>
                <Text style={styles.Continuebtntxt}>Add a photo</Text>
              </TouchableOpacity>,
            )}
            {renderIf(this.state.ok)(
              <TouchableOpacity
                style={styles.Continuebtn}
                onPress={() => this.uploadImage()}>
                <Text style={styles.Continuebtntxt}>Ok</Text>
              </TouchableOpacity>,
            )}
          </View>,
        )}
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: 'white',
    height,
  },
  logo: {
    width: 85,
    height: 21,
    marginLeft: 20,
  },
  color: {
    backgroundColor: 'transparent', // This works
  },
  input: {
    fontSize: 20,
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginTop: 0,
    marginRight: 20,
  },
  input2: {
    fontSize: 18,
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
  },

  txtStyle: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 40,
  },
  txtStyle2: {
    marginLeft: 20,
    marginTop: 5,
  },
  txtStyle3: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 22,
  },

  txtStyle4: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 40,
  },

  Continuebtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b66c3',
    height: 50,
    width: 350,
    borderRadius: 50,
    position: 'absolute',
    bottom: 60,
  },

  Continuebtntxt: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
    fontSize: 12,
  },
  fontChange: {
    color: '#0a66c2',
    fontWeight: 'bold',
  },

  errortxt: {
    marginTop: 10,
    marginLeft: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  box: {
    marginTop: 40,
    borderWidth: 1,
    width: width - 40,
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
  },
  circle: {
    backgroundColor: '#f8fafc',
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  camera: {
    alignSelf: 'center',
  },
  name: {
    fontSize: 25,
    color: 'black',
    alignSelf: 'center',
    marginTop: 10,
  },
  loading: {
    position: 'absolute',
    zIndex: 99,
    alignSelf: 'center',
    top: 550,
  },
});
