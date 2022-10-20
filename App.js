import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Routes from './screen/navigation/Routes';

const App = () => {
 
  return (
    <>
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#01b7a9"
        barStyle="light-content"
        showHideTransition="slide"
      />
      <Routes />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
