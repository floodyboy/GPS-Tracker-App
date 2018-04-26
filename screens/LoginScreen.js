import React from 'react';
import { Button, Text, View, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

export default class LoginScreen extends React.Component {

    render() {
      return (
      
        <ImageBackground 
        source={require('../assets/bkg_texture.png')}
        style={myStyle.container}>
      
          <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
          </View>
        </ImageBackground>
      );
    }
  }

  
var myStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});