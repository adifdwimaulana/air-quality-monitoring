import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from 'firebase';

const locations = [
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

const dayArray = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let day = new Date().getDay();
let date = new Date().getDate();
let month = new Date().getMonth() + 1;
// month = monthArray[month]
const year = new Date().getFullYear();
const currentDate = date + '-' + month + '-' + year;
const currentDay = dayArray[day]


class Data extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lokasi: '',
            co2: '',
            no2: '',
            temperature: '',
            humidity: '',
        }
    }

    handleSubmit(lokasi, co2, no2, temperature, humidity) {
        let url = '/' + lokasi + '/data';
        console.log(url);

        firebase.database().ref(url).push({
            co2,
            no2,
            temperature,
            humidity,
            date: currentDate,
            day: currentDay
        })
            .then(() => {
                this.setState({ co2: '', no2: '', temperature: '', humidity: '', lokasi: '' })
                alert('Data berhasil di Tambahkan');
                this.props.navigation.navigate('Data');
            })
    }

    handleLokasi(item) {
        console.log(item);
        this.setState({ lokasi: item.name })
    }

    render() {
        const { navigation } = this.props;
        const { lokasi, co2, no2, temperature, humidity } = this.state;
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={styles.container}>
                <Text style={styles.title}>Input Data Kualitas Udara</Text>
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Lokasi</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        onItemSelect={item => this.handleLokasi(item)}
                        textInputStyle={{
                            borderBottomColor: "#000",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            fontSize: 15
                        }}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        items={locations}
                        defaultIndex={0}
                        placeholder="Masukkan Lokasi"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={styles.inputTitleCO2}>Kadar CO</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Dalam PPB"
                        onChangeText={co2 => this.setState({ co2 })}
                        value={co2}
                    />
                    <Text style={styles.inputTitle}>Kadar NO2</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Dalam PPB"
                        onChangeText={no2 => this.setState({ no2 })}
                        value={no2}
                    />
                    <Text style={styles.inputTitle}>Suhu</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Dalam Celcius"
                        onChangeText={temperature => this.setState({ temperature })}
                        value={temperature}
                    />
                    <Text style={styles.inputTitle}>Kelembapan</Text>
                    <TextInput
                        style={styles.textInputKelembapan}
                        autoCapitalize="none"
                        placeholder="Dalam Persentase"
                        onChangeText={humidity => this.setState({ humidity })}
                        value={humidity}
                    />
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.handleSubmit(lokasi, co2, no2, temperature, humidity)} >
                        <Text style={styles.submitText}>
                            Submit
                    </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: 40,
        marginBottom: 40,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        color: '#000'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#000",
        fontSize: 10,
        textTransform: "uppercase"
    },
    inputTitleCO2: {
        color: "#000",
        fontSize: 10,
        textTransform: "uppercase",
        marginTop: 24
    },
    textInput: {
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F30",
        marginBottom: 24,
    },
    textInputKelembapan: {
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F30",
    },
    submitBtn: {
        height: 40,
        backgroundColor: "#6861CF",
        borderRadius: 4,
        marginTop: 6,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    submitText: {
        fontFamily: "Montserrat",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

export default Data;