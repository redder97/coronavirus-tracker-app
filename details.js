import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Button, Modal, TouchableHighlight, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar, Icon } from 'react-native-elements';
import Expanded from './Expanded';

function DataItem({title, totalDeaths, totalRecoveries, totalConfirmedCases, onPress}){
    return(
        <View style={styles.item}>
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subContent}>Confirmed Cases: {totalConfirmedCases}</Text>
                <Text style={styles.subContent}>Casualties: {totalDeaths}</Text>
                <Text style={styles.subContent}>Recoveries: {totalRecoveries}</Text>
            </View>
            <View style={{alignSelf: 'center'}}>
                <Icon
                name='arrow-right'
                type='simple-line-icon'
                color='#616A6B'
                onPress={onPress}
                reverse={true}
                />
            </View>
        </View>
        
    )
}

export default class details extends Component {
    _isMounted = false;

    state = {
        hasLoaded : false,
        search : '',
        test: 'ss',
        virusGeoData : [],
        virusGeoDataVisible: [],
        modalVisible: false,
        currentViewing: {},
        isRefreshing: false
    };

    componentDidMount(){
        this._isMounted = true;
        this.fetchData();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setModalVisible(visible, item) {
        this.viewable = item;
        console.log(this.viewable)
        this.setState({
            modalVisible: visible,
            currentViewing: item
        });
    }
    
    render() { 
        const { search } = this.state;
        let viewable = {};

        return (
            !this.state.hasLoaded ? 
            <View>
                <Text> Loading </Text>
            </View> : 
            <SafeAreaView style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    onClear={() => {
                        console.log("cancells");
                        this.setState({virusGeoDataVisible : this.state.virusGeoData});
                    }}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                    <View>
                        <View>
                        <Expanded {...this.state.currentViewing}/>
                        </View>
                    </View>
                </Modal>

                <FlatList
                data={this.state.virusGeoDataVisible}
                renderItem={({ item }) => 
                    <DataItem 
                        title={item.country}
                        totalDeaths={item.totalDeaths}
                        totalRecoveries={item.totalRecoveries}
                        totalConfirmedCases={item.totalConfirmedCases}
                        onPress={() => {this.setModalVisible(true, item)}}  
                    />}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }   
                keyExtractor={item => item.country}
                />
          </SafeAreaView>
        )

    }

    onRefresh(){
        this.setState({isRefreshing : true});
        this.fetchData();
    }

    updateSearch = search => {
        console.log(search)
        let searchable = search.toLowerCase();
        this.setState({ search: search });
        let tmp = [];
        tmp = this.state.virusGeoData
        .filter(data => data.country.toLowerCase().indexOf(searchable) != -1)
        this.setState({virusGeoDataVisible: tmp});
    };
    

    fetchData(){
        fetch("http://192.168.1.16:8080/confirmed-cases")
        .then(res => res.json())
        .then(data => 
            {
                this.setState({
                    virusGeoData : data,
                    virusGeoDataVisible: data,
                    hasLoaded: true,
                    isRefreshing: false
                })

            })
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
      
    },
    item: {
      backgroundColor: '#B2BABB',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row'
    },
    details: {
        textAlign: 'left',
        flex: 3
    },
    title: {
      fontSize: 32,
      fontFamily: 'sans-serif-condensed'
    },
    subContent: {
        fontSize: 18,
        fontFamily: 'sans-serif-condensed'
    },
    modalPress: {
        flex: 1
    },
    modalDes: {
        padding: 30
    }
  });
