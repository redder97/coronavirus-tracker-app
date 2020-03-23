import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Circle, Callout} from 'react-native-maps';
import { Icon } from 'react-native-elements';
import mapStyle from './MapStyle'


function GlobalStatistics({data}){
    return(
        <View style={styles.quarterSection}> 
            <Text style={styles.textAttention}>Global Statistics</Text>
            <View style={styles.information}>
                <View style={{width: '50%', flex: 1}}>
                    <Text style={styles.textTypical}>Confirmed Cases: </Text>
                    <Text style={styles.textTypical}>Recoveries: </Text>
                    <Text style={styles.textTypical}>Deaths: </Text>
                </View>
                <View style={{width: '50%', flex: 1}}>
                    <Text style={styles.textTypical, {textAlign: 'right'}}>{data.globalCases}</Text>
                    <Text style={styles.textTypical, {textAlign: 'right'}}>{data.globalRecoveries}</Text>
                    <Text style={styles.textTypical, {textAlign: 'right'}}>{data.globalDeaths}</Text>
                </View>
            </View>
        </View>
    )

}

export default class Map extends Component {

    state = {
        geoData: {},
        topByConfirmedCases : [],
        topByDeaths: [],
        topByRecoveries: [],
        renderable: []
    }

    
    componentDidMount(){
        this.fetchComposedData();
    }

    render() {
        
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    customMapStyle={mapStyle}
                >
                    {this.state.topByConfirmedCases.map(marker => (
                    <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(marker.longitude),
                        longitude: parseFloat(marker.latitude)
                    }}
                    tracksViewChanges={false}
                    flat={true}
                    title={marker.country}
                    >
                        <Icon
                            name='arrow-right'
                            type='simple-line-icon'
                            color='#616A6B'
                            reverse={true}
                            size={2}
                        />
                        <Callout tooltip={true}>
                            <Text>{marker.country}</Text>
                        </Callout>
                    </MapView.Marker>
                    
                    ))}
                    {this.state.renderable.map(marker => (
                    <Circle
                        center={{
                            latitude: parseFloat(marker.longitude),
                            longitude: parseFloat(marker.latitude)
                        }}
                        strokeWidth={0.7}
                        strokeColor={'#EF431E'}
                        fillColor={'#F08B75'}
                        radius={marker.value*3}
                        />
                    ))}
                    

                </MapView>
                <ScrollView style={styles.dashBoard}>
                    <View style={styles.row}>
                        <GlobalStatistics
                            data={this.state.geoData}
                        />
                        <View style={styles.quarterSection}>
                            <Button 
                                title={'View Top Spread'}
                                onPress={() => {
                                    this.viewTopSpread();
                                }}
                                color={'#EF431E'}
                            /> 
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
        )
    }

    fetchComposedData(){
        fetch("http://192.168.1.16:8080/composed-cases")
        .then(res => res.json())
        .then(data => 
            {
                this.setState({
                    geoData : data,
                    topByConfirmedCases : data.topByConfirmedCases,
                    topByDeaths : data.topByDeaths,
                    topByRecoveries: data.topByRecoveries
                })
                console.log("SSS")
                

                console.log(this.state.topByConfirmedCases)
            })
    }

    viewTopSpread(){
        let tmp = []
        if(this.state.renderable.length === 0){
            this.state.topByConfirmedCases.forEach(d => {
                tmp.push({latitude : d.latitude, longitude : d.longitude, value : d.confirmedCases})
            })
        }
            this.setState({renderable : tmp})
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',        
      },
      map: {
        height: '50%',
        width: '100%',
        zIndex: 0
      },
      dashBoard: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10
      },
      row : {
        flexDirection: 'row',
      },
      quarterSection : {
        width : '48%',
        borderRadius:5,
        borderColor: '#B2BABB',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 5,
        margin: 5
      },
      information: {
          flexDirection: 'row'
      },
      textAttention : {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
      },
      textTypical : {
        fontSize: 15,
        fontFamily: 'sans-serif-condensed'
      }


    
})

