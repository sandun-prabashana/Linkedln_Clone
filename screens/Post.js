import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, TextInput, Image   } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import renderIf from 'render-if';



const { width, height } = Dimensions.get('window');


export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
          imagepath: null,
          imagename:'',
          imageurl:'',
          image:false,
          
          
        }
      }


      CloseImage = () => {
        this.setState({ image: false });
        this.setState({ imagename: null });
        this.setState({ imagepath: null });
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



    render() {


        return (
            <View style={styles.mainView}>
                <StatusBar barStyle="dark-content" backgroundColor="white"/>
                <View style={styles.topView}>
                
                <Icon name="ios-close-outline" size={35} style={{marginLeft:10,marginTop:10}}/>
                <Text style={styles.share}>
                    Share post
                </Text>

                <TouchableOpacity style={{position:'absolute',right:50,zIndex:98,bottom:30}}>
                    <Text style={styles.post}>Post</Text>
                </TouchableOpacity>

                </View>

                <TextInput
                style={styles.input}
                placeholder="What do you want to talk about?"
                keyboardType="default"
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
      }

})