import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import SearchableDropdown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import firebase from 'firebase';

let dataArr = [];
let labelArr = []
const dayArray = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const monthArray = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
let today;

const items = [
    { id: 1, name: 'Dharmahusada' },
    { id: 2, name: 'Kenjeran' },
    { id: 3, name: 'Keputih' },
    { id: 4, name: 'Klampis' },
    { id: 5, name: 'Manyar' },
    { id: 6, name: 'Mulyosari' },
    { id: 7, name: 'Ngagel' },
    { id: 8, name: 'Rungkut' },
    { id: 9, name: 'Semampir' },
    { id: 10, name: 'Sutorejo' },
];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            day: '',
            date: '',
            location: null,
            coordinate: null,
            latlong: null,
            refreshing: false,
        }
    }

    componentDidMount() {
        let day = new Date().getDay();
        let date = new Date().getDate();
        let month = new Date().getMonth();
        month = monthArray[month]
        const year = new Date().getFullYear();
        console.log(month)

        if (date < 10) {
            date = '0' + date;
        }

        if (month < 10) {
            month = '0' + month;
        }

        let currentDay = dayArray[day];
        today = date + ' ' + month + ' ' + year;
        let currentDate = date + '-' + month + '-' + year;
        this.setState({ day: currentDay, date: currentDate })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        firebase.database().ref('/').once('value', (snap) => {
            let value = snap.val()
        }).then(() => {
            this.setState({ refreshing: false })
        })
    }

    handlePlace(item) {
        console.log(item)
        let locationName = item.name
        let locationId = item.id

        firebase.database().ref('/' + locationName).on('value', (snap) => {
            let latitude = snap.val().latitude
            let longitude = snap.val().longitude

            const location = {
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }

            const locationWithoutDelta = {
                latitude,
                longitude
            }

            const region = Object.create(location)
            const coordinate = Object.create(locationWithoutDelta)
            this.setState({ latlong: region, coordinate, location: locationName })

        })

        firebase.database().ref('/' + locationName + '/data').on('value', (snap) => {
            let key;
            let value;
            dataArr = []
            labelArr = []
            snap.forEach((item) => {
                key = item.key
                value = item.val()
                console.log(value.ispu)
                dataArr.push(Number(value.ispu))
                labelArr.push(value.day)
            })
            console.log(key)
            console.log(value)

            this.setState({ data: value })
        })
    }

    render() {
        const { data, day, date, location, latlong, coordinate, refreshing } = this.state
        console.log(day)
        console.log(date)

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps='always'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                {/* <Text style={styles.title}>Bezier Line Chart</Text> */}
                <Text style={styles.title}>Informasi Kualitas Udara</Text>
                <Text style={styles.date}>{day}, {today}</Text>
                <SearchableDropdown
                    style={styles.searchForm}
                    onTextChange={text => console.log(text)}
                    onItemSelect={item => this.handlePlace(item)}
                    textInputStyle={{
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginHorizontal: 20

                    }}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={{
                        color: '#222',
                    }}
                    items={items}
                    defaultIndex={0}
                    placeholder="Masukkan Lokasi"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />
                {location ?
                    <View>
                        <View style={styles.mapContainer}>
                            <MapView
                                style={{
                                    flex: 1, height: '100%', width: '100%', justifyContent: 'center', position: 'relative'
                                }}
                                region={latlong}
                            >
                                <MapView.Marker
                                    coordinate={coordinate}
                                    title={location}
                                />
                            </MapView>
                        </View>
                        <View style={styles.indicatorWrapper}>
                            <Text style={styles.ispu}>Index ISPU = {data.ispu}</Text>
                            <Text style={styles.status}>Status: {data.status}</Text>
                        </View>
                        <LineChart
                            data={{
                                labels: labelArr,
                                datasets: [
                                    {
                                        data: dataArr
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width * 0.94} // from react-native
                            height={220}
                            // yAxisLabel="$"
                            // yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#094ab5",
                                backgroundGradientFrom: "#1060e0",
                                backgroundGradientTo: "#4a88ed",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#094ab5"
                                }
                            }}
                            bezier
                            style={styles.chart}
                        />
                        <Text style={styles.pollen}>Pollen</Text>
                        <View style={styles.cardContainer}>
                            <View style={styles.card}>
                                <View style={styles.topPart}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={styles.valueWrapper}>
                                            <Icon name='thermometer' size={22} color='#fff' style={styles.iconValue} />
                                            <Text style={styles.value}>Temperature</Text>
                                        </View>
                                        <Text style={{ fontSize: 32, color: '#fff', fontWeight: '700', textAlign: 'center' }}>{data.temperature} C</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={styles.valueWrapper}>
                                            <Icon name='percent' size={22} color='#fff' style={styles.iconValue} />
                                            <Text style={styles.value}>Humidity</Text>
                                        </View>
                                        <Text style={{ fontSize: 32, color: '#fff', fontWeight: '700', textAlign: 'center' }}>{data.humidity} %</Text>
                                    </View>
                                </View>
                                <View style={styles.botPart}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={styles.valueWrapper}>
                                            <Icon name='cloud' size={22} color='#fff' style={styles.iconValue} />
                                            <Text style={styles.value}>CO2</Text>
                                        </View>
                                        <Text style={{ fontSize: 32, color: '#fff', fontWeight: '700', textAlign: 'center' }}>{data.co2} ppb</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={styles.valueWrapper}>
                                            <Icon name='fire' size={22} color='#fff' style={styles.iconValue} />
                                            <Text style={styles.value}>Nitrogen</Text>
                                        </View>
                                        <Text style={{ fontSize: 32, color: '#fff', fontWeight: '700', textAlign: 'center' }}>{data.no2} ppb</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> : <Text style={{ color: '#bbb', fontSize: 32, fontWeight: '700', textAlign: 'center', marginTop: 100 }}>Input Location</Text>
                }

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 24,
        letterSpacing: 0.8,
        color: '#000'
    },
    date: {
        fontSize: 12,
        color: '#333',
        marginTop: 4,
        marginLeft: 24,
        marginBottom: 10,
        fontWeight: "600",
        letterSpacing: 1.5
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 18
    },
    indicatorWrapper: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ispu: {
        fontSize: 24,
        fontWeight: '700',
        color: '#7c807c'
    },
    status: {
        fontSize: 12,
        color: '#73716b',
        fontWeight: '600',
        letterSpacing: 1.2
    },
    chart: {
        marginVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    pollen: {
        fontSize: 24,
        fontWeight: '700',
        color: '#7c807c',
        marginHorizontal: 20,
        marginTop: 8
    },
    cardContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 8
    },
    card: {
        width: Dimensions.get("window").width * 0.94,
        height: 200,
        backgroundColor: '#1060e0',
        borderRadius: 16,
        marginHorizontal: 'auto'
    },
    topPart: {
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    botPart: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    valueWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        // letterSpacing: 1.2,
        marginLeft: 6
    },
    mapContainer: {
        marginTop: 8,
        width: Dimensions.get("window").width * 0.94,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        marginLeft: Dimensions.get("window").width * 0.03,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        overflow: 'hidden',
    }
})

export default Dashboard;