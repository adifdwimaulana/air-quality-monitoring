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
                    data: [100]
                }],
                chart: {
                    type: "solidgauge"
                }
            }
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <HighchartsReactNative
                    styles={styles.chartContainer}
                    options={this.state.chartOptions}
                    modules={modules}
                />
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    chartContainer: {
        height: 300,
        width: 300,
        backgroundColor: '#fff',
    }
});