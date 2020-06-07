import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

export default class Data extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    componentDidMount() {

    }

    render() {
        let date = new Date().getDate();
        let month = new Date().getMonth();
        const year = new Date().getFullYear();
        const day = new Date().getDay();

        if (date < 10) {
            date = '0' + date;
        }
        if (month < 10) {
            month = '0' + month;
        }

        const currentDate = date + '-' + month + '-' + year;
        const currentDay = days[day];
        return (
            <View style={styles.container}>
                <View style={styles.location}>
                    <Icon name='map-marker' size={28} style={{ color: '#000' }} />
                    <Text style={styles.textLocation}>Keputih, Indonesia</Text>
                </View>
                <Text style={styles.date}>{currentDay}, {currentDate}</Text>
                <View style={styles.dataContainer}>
                    <View style={styles.dataLeft}>
                        <Text style={styles.dataTop}>Suhu</Text>
                        <Text style={styles.dataTemp}>30 C</Text>
                        <Text style={styles.dataBot}>Kelembapan</Text>
                        <Text style={styles.dataHumi}>76 %</Text>
                    </View>
                    <View style={styles.dataRight}>
                        <Text style={styles.dataTop}>CO2</Text>
                        <Text style={styles.dataCo}>523.5 Pb</Text>
                        <Text style={styles.dataBot}>NO2</Text>
                        <Text style={styles.dataNo}>20.37 ppb</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    location: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        alignItems: 'center'
    },
    textLocation: {
        marginLeft: 10,
        fontSize: 18,
        letterSpacing: 1.1,
        color: '#000'
    },
    date: {
        marginLeft: 18,
        marginTop: 4,
        fontSize: 13
    },
    dataContainer: {
        flexDirection: 'row',
        backgroundColor: '#6861cf',
        height: 200,
        marginHorizontal: 18,
        marginTop: 40,
        borderRadius: 8,
        justifyContent: 'center'
    },
    dataLeft: {
        flex: 1,
    },
    dataRight: {
        flex: 1,
    },
    dataTop: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        position: 'relative',
        paddingLeft: 8,
        paddingTop: 8
    },
    dataBot: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        position: 'absolute',
        paddingLeft: 8,
        top: 100
    },
    dataTemp: {
        marginLeft: 8,
        fontSize: 28,
        color: '#fff',
        marginTop: 8
    },
    dataCo: {
        marginLeft: 8,
        fontSize: 28,
        color: '#fff',
        marginTop: 8
    },
    dataHumi: {
        marginLeft: 8,
        fontSize: 28,
        color: '#fff',
        marginTop: 8,
        position: 'absolute',
        top: 125
    },
    dataNo: {
        marginLeft: 8,
        fontSize: 28,
        color: '#fff',
        marginTop: 8,
        position: 'absolute',
        top: 125
    }
});