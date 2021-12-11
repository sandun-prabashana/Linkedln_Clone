import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, theme, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import NewHome from './NewHome';
import MyNetwork from './MyNetwork'
import Post from './Post'
import Notification from './Notification'
import Jobs from './Jobs'


const Tab = createBottomTabNavigator();

export default class TabScreen extends Component {
    render() {
        return (
            <View style={styles.MainView} >
            <StatusBar barStyle="dark-content" backgroundColor="white"/>

            {/* <Header/> */}



            <Tab.Navigator initialRouteName="Home"

                screenOptions={{
                    
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        paddingVertical: Platform.OS === 'ios' ? 0 : 0,
                        height: 50,
                    }
                    
                }}
            >
                <Tab.Screen name="NewHome" component={NewHome}
                    options={{
                       
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                <Icon name="home" size={25} style={{ color: focused ? '#333333' : 'gray'}} />
                                <Text
                                    style={{ color: focused ? '#333333' : 'gray', fontSize: 12}}>
                                    Home
                                </Text>
                            </View>
                        ),
                    }} />
                <Tab.Screen name="MyNetwork" component={MyNetwork}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                <Icon name="people" size={25} style={{ color: focused ? '#333333' : 'gray'}} />
                                <Text
                                    style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                    My Network
                                </Text>
                            </View>
                        ),
                    }}
                />


                <Tab.Screen name="Post" component={Post}
                    options={{
                        headerShown: false,
                        tabBarVisible:true,
                        tabBarIcon: ({ focused }) => (
                            <TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                
                                <Icon2 name="plus-square" size={25} style={{ color: focused ? '#333333' : 'gray'}} 
                                 onPress={()=>this.props.navigation.navigate('Post')}

                                />
                                <Text onPress={()=>this.props.navigation.navigate('Post')}
                                    style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                    Post
                                </Text>
                            </View>
                            </TouchableOpacity>
                        ),
                    }}
                />



                <Tab.Screen name="Notification" component={Notification}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                <Icon name="notifications" size={25} style={{ color: focused ? '#333333' : 'gray'}} />
                                <Text
                                    style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                    Notification
                                </Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen name="Jobs" component={Jobs}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                <Icon2 name="briefcase" size={25} style={{ color: focused ? '#333333' : 'gray'}} />
                                <Text
                                    style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                    Jobs
                                </Text>
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignContent: 'center',
        zIndex: 95,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,

        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
icon:{
    position:'absolute',
    bottom:40,
    zIndex: 99,
    alignItems:'center',
    alignSelf: 'center',
    flex: 1,
}

});