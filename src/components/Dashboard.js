import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';

const modules = [
    'highcharts-more',
    'solid-gauge'
];

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: {
                series: [{
                    data: [1, 3, 2]
                }]
            }
        };
    }
    render() {
        return (
            <View>
                <HighchartsReactNative
                    styles={styles.container}
                    options={this.state.chartOptions}
                    modules={modules}
                />
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        // height: 200,
        // width: 200,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
});