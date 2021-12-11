import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';

export default class a extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
    }
  }

  componentDidMount(){
    const subscriber = firestore()
    .collection('User')
    .whereEqualTo("UserName", 'Sandun Prabashana')
    .onSnapshot(querySnapshot => {
      const customer = [];

      querySnapshot.forEach(documentSnapshot => {
        customer.push({
          name: documentSnapshot.data().ProficeImage,
          key:documentSnapshot.id,
        });
      });

    });
      
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
