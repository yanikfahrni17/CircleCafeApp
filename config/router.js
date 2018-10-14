import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/de-ch';

import Feed from '../screens/Feed';
import Me from '../screens/Me';
import UserDetail from '../screens/UserDetail';
import Settings from '../screens/Settings';

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Events',
    },
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: <Moment element={Text} locale="de-ch" fromNow>{navigation.state.params.fb_start_time}</Moment>,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      
    }),
  },
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Circle Café',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
      
    },
  },
},{
  tabBarOptions: {
    activeTintColor: '#ffda00',  // Color of tab when pressed
    inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#333333', // Makes Android tab bar white instead of standard blue

    }
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Login',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
