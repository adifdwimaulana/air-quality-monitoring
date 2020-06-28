import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from 'firebase';

const locations = [
    { id: 1, name: 'Keputih' },
    { id: 2, name: 'Ketintang' },
];

const dayArr = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

let dosenArr = [];

class Data extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lokasi: null,
            co2: '',
            no2: '',
            temperature: '',
            humidity: '',
        }
    }

    handleSubmit(day, matkul, start, end, dosen, ruangan) {
        let roomUrl = ruangan.id;
        let roomName = ruangan.name;
        let dayUrl = String(day);
        dayUrl = dayUrl.toLowerCase();
        console.log(dayUrl);

        let url = '/' + roomUrl + '/matkul/' + dayUrl;
        console.log(url);

        firebase.database().ref(url).push({
            dosen,
            nama: matkul,
            start,
            end,
            ruangan: roomName
        })
            .then(() => {
                this.setState({ day: '', matkul: '', start: '', end: '', dosen: '', ruangan: '' })
                alert('Data berhasil di Tambahkan');
                this.props.navigation.navigate('Data');
            })
    }

    handleLokasi(item) {
        console.log(item);
    }

    render() {
        const { navigation } = this.props;
        const { day, matkul, start, end, dosen, ruangan, dosenList } = this.state;
        console.log(dosenArr);
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
                        defaultIndex={2}
                        placeholder="Masukkan Lokasi"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={styles.inputTitleCO2}>Kadar CO2</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="87 ppb"
                        onChangeText={matkul => this.setState({ matkul })}
                        value={matkul}
                    />
                    <Text style={styles.inputTitle}>Kadar NO2</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="944 ppb"
                        onChangeText={start => this.setState({ start })}
                        value={start}
                    />
                    <Text style={styles.inputTitle}>Suhu</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="29"
                        onChangeText={end => this.setState({ end })}
                        value={end}
                    />
                    <Text style={styles.inputTitle}>Kelembapan</Text>
                    <TextInput
                        style={styles.textInputKelembapan}
                        autoCapitalize="none"
                        placeholder="77%"
                        onChangeText={end => this.setState({ end })}
                        value={end}
                    />
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.handleSubmit(day, matkul, start, end, dosen, ruangan)} >
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