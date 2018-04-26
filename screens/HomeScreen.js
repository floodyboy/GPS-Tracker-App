import React from 'react';
import { Alert, Linking, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from ".././styles/styles";

export const email = 'liam@mcmains.net';
export const password = 'password';

export default class HomeScreen extends React.Component {

  state = {
    fontLoaded: false,
  }

  async componentWillMount()
  {
    await Expo.Font.loadAsync({
        'seguisb': require('../assets/seguisb.ttf'),
      });

    this.setState({fontLoaded: true});
  }

  render() {
    return (
      <ImageBackground 
        source={require('../assets/splash.png')}
        style={myStyles.container}>
      
        {this.state.fontLoaded ? <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={myStyles.display}>Salvus</Text>
          <Image
            source={require('../assets/logo.png')}
            style={{width: 150, height: 150, margin: 20}}
         />  
        </View> : null}
     </ImageBackground>
    );
  }
}

var myStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  display: 
  {
    fontFamily: 'seguisb',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  }
});

