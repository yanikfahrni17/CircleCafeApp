'use strict';
import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';

import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import { 
  Icon 
} from 'react-native-elements';
import { Root } from './config/router';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then(() => {
        this.setState({
          isAuthenticated: true,
        });
      });
  }
  render() {

    if (!this.state.isAuthenticated) {
      return null;
    }
    return <Root />;
  }
}
export default App;