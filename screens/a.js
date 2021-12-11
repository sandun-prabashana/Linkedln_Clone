import React, { Component } from 'react'
import { Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class a extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoaded:false,
    };
  }
componentDidMount(){
  this.getSavedStorage()
  // console.log(auth().currentUser.displayName);
}
  getSavedStorage=()=> {
    if(auth().currentUser != null){
console.log('hi hi');
console.log(auth().currentUser.displayName)
    }else{
console.log('hello')
    }
  }


  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
