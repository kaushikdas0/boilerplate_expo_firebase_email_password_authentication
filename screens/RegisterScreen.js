import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';


export default class Register extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            verified: false
        };
    }

    SignUp = (email, password) => {
        console.log("signup is called")
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                });

        } catch (error) {
            console.log(error.toString(error));
        }
    }

    onPressButton() {
        console.log("onPress button is called")
        alert('You tapped the button!')
        firebase.database().ref('users/1111').set({
            highscore: 1111
        });

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Observer is called and logged in")

            } else {
                console.log("Observer is called and not logged in")
            }
        });
    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Text>{this.state.verfied}</Text>
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
                    title="Register"
                    onPress={() => this.SignUp(this.state.email, this.state.password)}
                />
                <Button
                    title="Go to Login"
                    onPress={() => navigate('Login')}
                />


            </View>
        )
    }
}