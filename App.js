import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import LoginScreen from './screens/LoginScreen';

var offwhite = '#ffffff';
var iconsize = 38;

var MainNav = TabNavigator(
  {
    Tab1: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Ionicons
            name = {focused ? 'ios-home' : 'ios-home-outline'}
            size = {iconsize}
            style={{ color: focused ? '#1ebbd7' : offwhite}}
          />  
        ),
        tabBarLabel: 'Home'
      }
    },
    Tab2: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Ionicons
            name = {focused ? 'ios-map' : 'ios-map-outline'}
            size = {iconsize}
            style={{ color: focused ? '#1ebbd7' : offwhite}}
          />  
        ),
        tabBarLabel: 'Explore'
      }
    },
  }, {
    tabBarPosition: 'bottom',
    swipeEnabled: true, 
    tabBarOptions: {
      activeBackgroundColor: 'turquoise',
      inactiveBackgroundColor: 'turquoise',
      indicatorStyle: {
        backgroundColor: 'rgba(0,59,85, 255)'
      },
      style: {
        backgroundColor: 'rgba(0,59,85, 255)',
        height: 60,
      },
      iconStyle: {
        width: 30,
        height: 30,
        margin: 0,
        padding: 0
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: 'turquoise',
    }
  }
);

export default MainNav;