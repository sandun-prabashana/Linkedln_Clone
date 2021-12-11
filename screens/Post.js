import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, TextInput, Image, ActivityIndicator   } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import renderIf from 'render-if';
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const { width, height } = Dimensions.get('window');


export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagepath: "file:///storage/emulated/0/Android/data/com.linkedln_clone_mint/files/Pictures/9a7896e6-11e9-461b-8377-adea1a3c80db.jpg",
      imagename:'',
      imageurl:'',
      image:false,
      name:'',
      text:'',
      spinner : false
    }
  }

  AddPost= async()=> {

       await firestore().collection('Post').add({
          PostUrl: this.state.imageurl,
          UserName: this.state.name,
          PostText: this.state.text,
          PostTime:firestore.Timestamp.fromDate(new Date()),
          like:null,
          comment:null,
        })
        .then(()=> {
          this.setState({ text: '' });
          this.setState({ image: false });
          this.setState({ spinner: false });
          alert('added success')
          console.log('post added!');
        })
        .catch((error)=> {
          console.log('something went wrong !!');
        })

  }


  componentDidMount() {
    this.getSavedStorage()
  }

  getSavedStorage=()=> {
    try{
        AsyncStorage.getItem('userData').then(value=>{
            if (value!=null) {
              let user=JSON.parse(value)
                this.setState({ name: user.name});
                console.log(this.state.name)
            }else{
              
            }
        })

    }catch(error){
     console.log(error);
    }
}




      CloseImage = () => {
        this.setState({ image: false });
        this.setState({ imagename: null });
        this.setState({ imagepath: null });
      }

      CloseScreen=()=>{
        this.props.navigation.navigate('TabScreen')
      }

      getImageFromGallery =()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image.path);
            this.setState({
                imagepath:image.path
            })
            this.setState({
                imagename:image.modificationDate
            })
            console.log(this.state.imagepath);
            console.log(this.state.imagename);
            this.setState({ image: true });
          });
        }

        uploadImage = async ()=>{
          this.setState({ spinner: true });

          const filename= this.state.imagename + ".jpg"

          const reference = storage().ref(`images/${filename}`);
          await reference.putFile(this.state.imagepath);

          const url = await storage().ref(`images/${filename}`).getDownloadURL();
          console.log(url)
          this.setState({
              imageurl:url
          })
          console.log(this.state.imageurl)

          this.AddPost()
      }
        
        PostText = (e) => {
          this.setState({ text: e });

      }


    render() {
        return (
            <View style={styles.mainView}>

        {
          this.state.spinner &&
          <ActivityIndicator style={styles.loading} color={'#0b66c3'} size="large"/>
        }
                <StatusBar barStyle="dark-content" backgroundColor="white"/>
                <View style={styles.topView}>
                
                <Icon name="ios-close-outline" size={35} style={{marginLeft:10,marginTop:10}}
                onPress={()=>this.CloseScreen()}
                />
                <Text style={styles.share}>
                    Share post
                </Text>

                <TouchableOpacity style={{position:'absolute',right:50,zIndex:98,bottom:30}} onPress={()=>this.uploadImage()}>
                    <Text style={styles.post}>Post</Text>
                </TouchableOpacity>

                </View>

                <Text style={styles.name}>{this.state.name}</Text>


                <TextInput
                style={styles.input}
                value={this.state.text}
                placeholder="What do you want to talk about?"
                keyboardType="default"
                onChange={(val) => this.PostText(val.nativeEvent.text)}
            />
            {renderIf(this.state.image)(
            <View style={{marginTop:10}}>
              <Image 
              source={{
                uri: this.state.imagepath,
              }}
              style={{height: 400, width:width-40,alignSelf:'center',borderRadius:10}}/>

                <Icon name="md-close-circle" size={35} style={styles.close} onPress={()=>this.CloseImage()}/>

            </View>
            )}


            <View style={{marginLeft:12,marginTop:50}}>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={()=> this.getImageFromGallery()}>
                <Icon2 name="image" size={20} />
                <Text style={styles.photo}>Add a photo</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainView:{
        backgroundColor:'white',
        height:height,
        // position:'absolute',
        // top:33
    },

    topView:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: width,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    share:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
        marginTop:15,
        marginLeft:5,
    },
    post:{
        fontSize:16,
        fontWeight:'bold',
        position:'absolute',
        color:'#2661a0'
    },
    input: {
        height: 50,
        margin: 12,
        padding: 10,
        fontSize:20,
      },
      photo:{
          fontSize:15,
          fontWeight:'bold',
          marginLeft:15,
      },

      close:{
        marginLeft:10,
        marginTop:10,
        position:'absolute',
        zIndex:97,
        color:'white',
        right:30,
      },
      name:{
        color:'black',
        fontSize:20,
        marginTop: 10,
        alignSelf:'center'
      },
      loading:{
        position:'absolute',
        zIndex:99,
        alignSelf:'center',
        top:700,
      }

})