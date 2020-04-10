import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';

export default class HomeScreen extends React.Component {

  
  constructor (props){
    super(props)
    this.state = {
      coords: null,
      errorMessage: null,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      },
    }
    this.watchLocationAsync();
  }


  watchLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    const location = await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Low,
            distanceInterval: 1000,
            timeInterval: 30000,
            mayShowUserSettingsDialog: true
        },
        newLocation => {
            let coords = newLocation.coords;
            console.log(coords.latitude)
            console.log(coords.longitude)
            this.setState({
              coords: coords
            })
        // this.props.getMyLocation sets my reducer state my_location
      },
      error => console.log(error)
    );
  };

  render(){
    let text = 'Waiting..';
    const LOCATION_SETTINGS = {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 200,
      distanceInterval: 0,
    };

  
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.coords) {
      text = this.state.coords.latitude + "," + this.state.coords.longitude;
    }
    return(
      <View style={styles.container}>
      <Text>{text}</Text>
    </View>
    )
  }

}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
