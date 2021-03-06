import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import renderIf from 'render-if';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagepath: '',
      imagename: '',
      imageurl: '',
      image: false,
      name: auth().currentUser.displayName,
      text: '',
      spinner: false,
      data:[]
    };
  }

  AddPost = async () => {
    await firestore()
      .collection('Post')
      .add({
        UserPic:auth().currentUser.photoURL,
        PostUrl: this.state.imageurl,
        UserName: this.state.name,
        PostText: this.state.text,
        PostTime: firestore.Timestamp.fromDate(new Date()),
        like: 0,
        comment: 0,
      })
      .then(() => {
        this.setState({text: ''});
        this.setState({image: false});
        this.setState({spinner: false});
        alert('added success');
        console.log('post added!');
      })
      .catch(error => {
        console.log('something went wrong !!');
      });
  };

  CloseImage = () => {
    this.setState({image: false});
    this.setState({imagename: null});
    this.setState({imagepath: null});
  };

  CloseScreen = () => {
    this.props.navigation.navigate('TabScreen');
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
      this.setState({image: true});
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
    console.log(this.state.imageurl);

    this.AddPost();
  };

  PostText = e => {
    this.setState({text: e});
  };

  render() {
    return (
      <View style={styles.mainView}>
        {this.state.spinner && (
          <ActivityIndicator
            style={styles.loading}
            color={'#0b66c3'}
            size="large"
          />
        )}
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.topView}>
          <Icon
            name="ios-close-outline"
            size={35}
            style={{marginLeft: 10, marginTop: 10}}
            onPress={() => this.CloseScreen()}
          />
          <Text style={styles.share}>Share post</Text>

          <TouchableOpacity
            style={{position: 'absolute', right: 50, zIndex: 98, bottom: 30}}
            onPress={() => this.uploadImage()}>
            <Text style={styles.post}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
        <Image
          style={styles.profilepicture}
          source={{
            uri: auth().currentUser.photoURL,
          }}
        />
        <Text style={styles.name}>{this.state.name}</Text>
        </View>
        <TextInput
          style={styles.input}
          value={this.state.text}
          placeholder="What do you want to talk about?"
          keyboardType="default"
          onChange={val => this.PostText(val.nativeEvent.text)}
        />
        {renderIf(this.state.image)(
          <View style={{marginTop: 10}}>
            <Image
              source={{
                uri: this.state.imagepath,
              }}
              style={{
                height: 400,
                width: width - 40,
                alignSelf: 'center',
                borderRadius: 10,
              }}
            />

            <Icon
              name="md-close-circle"
              size={35}
              style={styles.close}
              onPress={() => this.CloseImage()}
            />
          </View>,
        )}

        <View style={{marginLeft: 12, marginTop: 50}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => this.getImageFromGallery()}>
            <Icon2 name="image" size={20} />
            <Text style={styles.photo}>Add a photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    height: height,
  },

  topView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: width,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  share: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
    marginLeft: 5,
  },
  post: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    color: '#2661a0',
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    fontSize: 20,
  },
  photo: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  close: {
    marginLeft: 10,
    marginTop: 10,
    position: 'absolute',
    zIndex: 97,
    color: 'white',
    right: 30,
  },
  name: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
    marginLeft:20
  },
  loading: {
    position: 'absolute',
    zIndex: 99,
    alignSelf: 'center',
    top: 700,
  },
  profilepicture:{
    width:50,
    height:50,
    borderRadius:100,
    marginTop:10,
    marginLeft:20
  }
});
