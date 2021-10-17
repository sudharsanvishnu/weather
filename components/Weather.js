import React from 'react'
import { StyleSheet, Text, View, ScrollView , Image } from 'react-native'
import SlidingTile from './SlidingTile'
import moment from 'moment-timezone';

const CurrentTemp = ({data}) => {

    
    if (data && data.weather){
        const icon = {uri:`http://openweathermap.org/img/wn/`+ data.weather[0].icon +`@4x.png`} 
        return(
            <View style={styles.container}>
                <Image source= {icon} style={styles.img} />
                    <View style={styles.containerTwo}>
                        <Text style={styles.day} >{moment(data.dt *1000).format('dddd')}</Text>
                        <Text style={styles.temp}>Night {data.temp.night}&#176;C</Text>
                        <Text style={styles.temp}>Day {data.temp.day}&#176;C</Text>
                        <Text style={styles.temp}>{data.weather[0].description}</Text>
                    </View>
            </View>
        )
    }else{
        return(
            <View>

            </View>
        )
    }
}

const Weather = ({weatherData}) => {
    return(
        <ScrollView horizontal={true} style={styles.scroll}>
            <CurrentTemp data={ weatherData && weatherData.length > 0 ? weatherData[0] : []}/>
            <SlidingTile data={weatherData} />
        </ScrollView>
    )
}

export default Weather;

const styles = StyleSheet.create({
    scroll: {
        flex: 0.4,
        padding: 7,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 10
    },  
    img: {
        width: 200,
        height: 150
    },
    containerTwo: {
        padding: 10
    },  
    day:{
        fontSize: 25,
        color: 'white',
        fontWeight: '100',
        padding: 7,
        textAlign: 'center',
        backgroundColor: '#114aa680',
        borderRadius: 20,
        marginBottom: 5
    },
    temp: {
        fontSize: 15,
        color: 'white',
        fontWeight: '200',
        textAlign: 'center'
    },
})
