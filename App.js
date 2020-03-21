import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import Map from './Map';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from './store';
import { StoreProvider, createStore } from 'easy-peasy';
import details from './details';

const source = createStore(store);


const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <StoreProvider store={source}>
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Details">
        <Tab.Screen name="Maps" component={Map} 
        options={{title: 'Map'}}
        />
        <Tab.Screen name="Details" component={details} />
      </Tab.Navigator>
    </NavigationContainer>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  } 
});

export default App;
