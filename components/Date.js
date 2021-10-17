import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment-timezone';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const WeatherItem = ({title, value, unit}) => {
    return(
        <View style={styles.prop}>
            <Text style={styles.txValue}>{title}</Text>
            <Text style={styles.txValue}>{value}{unit}</Text>
        </View>
    )
};

const DateItem = ({current, lat, lon, timezone}) => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect (() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const amPm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +amPm) 
        
            setDate(days[day] + ', ' +date+ ' ' + months[month]) 
    }, [])
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',   padding: 20,}}>
                <View style={styles.time}> 
                    <Text style={styles.txTime}>{time}</Text>
                    <Text style={styles.txPlace}>{date}</Text>
                </View>
                <View style={styles.time2}>
                    <Text style={styles.txRight}>{timezone}</Text>
                    <Text style={styles.txRight}>{lat}N{lon}E</Text>
                </View>
            </View>
            <View style={styles.values}>
                <WeatherItem title='Humidity' value={current? current.humidity : ''} unit='%'/>
                <WeatherItem title='Pressure' value={current? current.pressure: ''}unit='hPA'/>
                <WeatherItem title='Sunrise' value={current? moment.tz(current.sunrise * 1000, timezone).format('hh:mm'): ''}unit='Am'/>
                <WeatherItem title='Sunset' value={current? moment.tz(current.sunset * 1000, timezone).format('hh:mm'): ''} unit='Pm'/>
            </View>
        </View>
    )
}

export default DateItem;

const styles = StyleSheet.create({
    container:{
        flex: 1.8,
    },
    time: {
        marginTop: 15,
    },
    txTime: {
        fontSize: 50,
        color: 'white',
        fontWeight: '100',
    },
    txPlace: {
        fontSize: 20,
        color: 'white',
        fontWeight: '100'
    },
    time2: {
        marginTop: 60,
    },
    txRight: {
        fontSize: 20,
        color: 'white',
        fontWeight: '100',
        textAlign: 'right',
        fontWeight: '100'
    },
    values: {
        backgroundColor: '#00000080',
        padding: 10,
        borderRadius: 10,
        width: 175,
        marginLeft: 100,
        marginTop: 125,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1.37,
        shadowRadius: 50.49,
        
        elevation: 12,
    },
    prop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    txValue: {
        fontSize: 15,
        color: 'white',
    },
    
})
