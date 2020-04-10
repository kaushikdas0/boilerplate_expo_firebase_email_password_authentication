import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions, Button, TextInput, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';

import { createStackNavigator } from '@react-navigation/stack';

import Register from '../screens/RegisterScreen'
import Login from '../screens/LoginScreen';
import Home from './BottomTabNavigator';

export default class AuthStateNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            loading: true
        };
    }

    componentDidMount() {
         firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false
                })
                console.log("fb auth oserver X")
            } else {
                console.log("fb auth oserver y")
                this.setState({
                    loading: false
                })
            }
        })
    }


    render() {
        const Stack = createStackNavigator();
        return (
            <>
                {this.state.loading ?
                    <>
                        <View><Text>Loading</Text></View>
                    </>
                    :
                    < >
                        <Stack.Navigator>
                            {this.state.authenticated ?
                                <>
                                    <Stack.Screen name="Home" component={Home} />
                                </>
                                :
                                <>
                                    <Stack.Screen name="Register" component={Register} />
                                    <Stack.Screen name="Login" component={Login} />
                                </>
                            }
                        </Stack.Navigator>
                    </>
                }

            </>


        )
    }

}