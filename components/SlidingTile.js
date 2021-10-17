import moment from 'moment'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const SlidingTile = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
                data && data.length > 0 ? 

                data.map((data, id) => (
                    id !==0 && <SlidingItem key={id} SlideItem={data}/>
                ))
                :
                <View/>
            }
        </View>
    )
}

const SlidingItem = ({SlideItem}) => {

    const icon = {uri:`http://openweathermap.org/img/wn/`+SlideItem.weather[0].icon +`@2x.png`} 

    return(
        <View style={styles.slidingContainer}>
                <Text style={styles.day}>{moment(SlideItem.dt *1000).format('ddd')}</Text>
                <Image source= {icon} style={styles.img}/>
                <Text style={styles.temp}>Night {SlideItem.temp.night}&#176;C</Text>
                <Text style={styles.temp}>Day {SlideItem.temp.night}&#176;C</Text>
                <Text style={styles.temp}>{SlideItem.weather[0].description}</Text>
        </View>
    )
}


export default SlidingTile;

const styles = StyleSheet.create({
    img: {
        width: 150,
        height: 100
    },
    slidingContainer: {
        flex:1,
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 10,
        marginLeft: 10
    },
    day: {
        fontSize: 25,
        color: 'white',
        fontWeight: '100',
        padding: 7,
        textAlign: 'center',
        backgroundColor: '#66a31080',
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
