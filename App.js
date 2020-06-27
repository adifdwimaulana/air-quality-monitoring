import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import Dashboard from './src/components/Dashboard';

function App() {
  return (
    <>
      <Dashboard />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
});

export default App;
