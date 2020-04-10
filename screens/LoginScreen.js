import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    Login = (email, password) => {
        console.log("Login is called")
        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
                console.log(user)

            });
        } catch (error) {
            console.log(error.toString(error))
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Register Screen</Text>

                <Text>Email</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={email => this.setState({ email })}
                />

                <Text>Password</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={password => this.setState({ password })}
                />


                <Button
                    title="Login"
                    onPress={() => this.Login(this.state.email, this.state.password)}
                />
                <Button
                    title="Go to Register"
                    onPress={() => navigate('Register')}
                />


            </View>
        )
    }
}