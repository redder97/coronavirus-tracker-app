import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import  RNFetchBlob  from 'rn-fetch-blob';
import { useStoreState } from 'easy-peasy';
import axios from 'axios';

export default class Map extends Component {

    
    componentDidMount(){
        
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
    
})
