import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import Svg, {Path} from 'react-native-svg';

export default class Expanded extends Component {
    _isMounted = false;
    dataset = [];
    chartData = [];

    constructor(props) {
        super(props);
        this.state = props;
        this.dataset = this.state.provincialCaseList
    }

    componentDidMount(){
        this._isMounted = false;

    }

    componentWillUnmount(){
        this._isMounted = true;
    }
    render() {
        this.initializeData();
        return (
        this.chartData.length > 0 ? 
        <View style={style.content}>

            <FlatList
                data={this.chartData}
                renderItem={({item}) => 
                    <View>
                    <Text>{
                        item.province == "" ? "unknown" 
                        || item.province == undefined
                        || item.province == null
                        : item.province} </Text>
                    <PieChart
                        data={item.chart}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute 
                    />
                    </View>
                }
            
            
            />
            
        </View> : 
        <View>
            No data available
        </View>
        );
    }

    initializeData(){
        this.dataset.forEach(provincialData => {
            console.log(provincialData);
            let individualProvinceRates = [];
            individualProvinceRates.push(
                {
                    name: 'Cases',
                    population: provincialData.confirmedCases,
                    color: 'rgba(131, 167, 234, 1)',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                }
            )

            individualProvinceRates.push(
                {
                    name: 'Deaths',
                    population: provincialData.deaths,
                    color: '#F00',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                }
            )

            individualProvinceRates.push(
                {
                    name: 'Recoveries',
                    population: provincialData.recoveries,
                    color: 'rgb(0, 0, 255)',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                  }
            )
            this.chartData.push({province: provincialData.province, chart: individualProvinceRates});
        })
        
    }
}

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    }

}

const style = StyleSheet.create({

    content : {
        paddingLeft : 20
    }
    
})