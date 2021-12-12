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
  FlatList,
  RefreshControl,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import renderIf from 'render-if';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
const {width, height} = Dimensions.get('window');



export default class NewHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Image:'',
      allLikes:0,
      liked:true,
      isFocused: true,
      image:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.vuescript.com%2Fwp-content%2Fuploads%2F2018%2F11%2FShow-Loader-During-Image-Loading-vue-load-image.png&imgrefurl=https%3A%2F%2Fwww.vuescript.com%2Fshow-loader-during-image-loading-vue-load-image%2F&tbnid=Is8ouTNdzCT0DM&vet=12ahUKEwjvgoPV-9z0AhWIw3MBHf1AAHUQMygIegUIARDuAQ..i&docid=HmCgNqK9fdBgOM&w=443&h=344&itg=1&q=loading%20image&ved=2ahUKEwjvgoPV-9z0AhWIw3MBHf1AAHUQMygIegUIARDuAQ',
    };
  }

  loadImage = () => {
    this.setState({ image: auth().currentUser.photoURL });

}

  componentDidMount() {
    const subscriber = firestore()
      .collection('Post')
      .onSnapshot(querySnapshot => {
        const post = [];

        querySnapshot.forEach(documentSnapshot => {
          post.push({
            PostText: documentSnapshot.data().PostText,
            PostTime: documentSnapshot.data().PostTime,
            PostUrl: documentSnapshot.data().PostUrl,
            UserPic:documentSnapshot.data().UserPic,
            UserName: documentSnapshot.data().UserName,
            comment: documentSnapshot.data().comment,
            like: documentSnapshot.data().like,
            key: documentSnapshot.id,
          });
        });

        this.setState({
          data: post,
        });

      });
      setTimeout(() => {
        this.loadImage();
      }, 2000);
       
  }

  imageSet = (e) => {
    this.setState({ Image: e });
}


  updateLike=(user,count)=> {
    this.setState({allLikes : count})
    this.setState({
        allLikes: this.state.allLikes + 1
      })
    firestore()
    .collection('Post')
    .doc(user)
    .update({
        
      'like': this.state.allLikes,
    })
    .then(() => {
      console.log('User updated!');
    });
  }


  render() {
    return (
      <View style={styles.mainView}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View style={styles.topView}>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
          <Image
            style={styles.Profile}
            source={{
              uri: this.state.image,
            }}
            
          />
          </TouchableOpacity>
          

          <View style={styles.search}>
            <Icon2
              name="search"
              size={15}
              style={{marginLeft: 10, marginTop: 8}}
            />
            <TextInput style={styles.input} placeholder="Search" />
          </View>
          <Icon
            name="chatbox-ellipses"
            size={25}
            style={{marginLeft: 30, marginTop: 13}}
          />
        </View>

        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
              
            <View style={styles.post}>
                <View style={{flexDirection:'row'}}>
              
              <Image
                style={styles.profile2}
                source={{
                  uri: item.UserPic,
                }}
              />

              <Text style={styles.userName}>{item.UserName}</Text>
              </View>
              <Text style={styles.postText}>{item.PostText}</Text>
              <Image
                style={styles.postimage}
                source={{
                  uri: item.PostUrl,
                }}
              />
                <View style={{flexDirection:'row'}}>
                <Image style={styles.likeImage} source={require('../img/like.jpeg')} />
                <Text style={styles.likeCount} >{item.like}</Text>
                <Text style={styles.commentCount} >{item.comment}</Text>
                <Text style={styles.comment} >Comment</Text>
                </View>

                <View style={styles.break}></View>
                <View style={{flexDirection:'row'}}>
                <Icon3
              name="like2"
              size={20}
              style={{marginLeft: 50, marginTop: 15}}
              onPress={()=>this.updateLike(item.key,item.like)}
            />
            <Icon2
              name="comment-o"
              size={20}
              style={{marginLeft: 70, marginTop: 15}}
            />
            <Icon2
              name="share"
              size={20}
              style={{marginLeft: 70, marginTop: 15}}
            />
            <Icon2
              name="send"
              size={20}
              style={{marginLeft: 70, marginTop: 15}}
            />
                    </View>
                    <View style={{flexDirection:'row'}}>
                
                <Text
                style={{marginLeft: 50, marginTop: 0,fontSize:12}}
                >Like</Text>
                <Text
                style={{marginLeft: 55, marginTop: 0,fontSize:12}}
                >Comment</Text>
                <Text
                style={{marginLeft: 58, marginTop: 0,fontSize:12}}
                >Share</Text>
                <Text
                style={{marginLeft: 62, marginTop: 0,fontSize:12}}
                >Send</Text>
                    </View>

            </View>
          )}
        //   keyExtractor={item => {
        //     item.key;
        //     console.log(item.key)
        //   }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#e9e6df',
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
  Profile: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 10,
    resizeMode: "cover",
  },
  search: {
    backgroundColor: '#eef3f7',
    width: 250,
    height: 30,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  input: {
    color: 'black',
    fontSize: 11,
    marginTop: 1,
    marginLeft: 10,
    width: 100,
    height: 32,
  },
  post: {
    backgroundColor: 'white',
    width: width,
    height: 620,
    marginTop: 10,
  },
  profile2:{
      width:50,
      height:50,
      borderRadius:100,
      marginTop:15,
      marginLeft:15,
      resizeMode: "cover",
  },
  userName:{
      color:'black',
      fontWeight:'bold',
      fontSize:15,
      marginTop:30,
      marginLeft:20,
  },
  postText:{
      color:'black',
      marginLeft:20,
      marginTop:10,
  },
  postimage:{
      width:width-40,
      height:400,
      alignSelf:'center',
      marginTop:10,
      resizeMode: "contain",
  },
  likeImage:{
      height:20,
      width:60,
      marginTop:20,
      marginLeft:20,
      resizeMode: "cover",
  },
  likeCount:{      
      marginTop:22,
      marginLeft:15
  },
  commentCount:{      
    marginTop:22,
    marginLeft:190
},
comment:{      
    marginTop:22,
    marginLeft:10
},
break:{
    marginTop:20,
    alignSelf:'center',
    width:width-40,
    backgroundColor:'#f0f0f0',
    height:1
}

});
