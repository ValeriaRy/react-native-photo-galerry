import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import createRootNavigator from './RootNavigator';

export default class App extends Component {
  constructor() {
    super();

    this.RootNavigator = createRootNavigator();   
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <this.RootNavigator />
      </View>
    )
  }
}
