import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

import OnePage from './screens/one'
import TwoPage from './screens/two'
import ThreePage from './screens/three';
import FourPage from './screens/four';
import FivePage from './screens/five';


// Definindo as cenas
const renderScene = SceneMap({
  first: OnePage,
  second: TwoPage,
  third: ThreePage,
  fourth: FourPage,
  fifth: FivePage,
});

export default function App() {
  const [welcome, setWelcome] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'One' },
    { key: 'second', title: 'Two' },
    { key: 'third', title: 'Three' },
    { key: 'fourth', title: 'Four' },
    { key: 'fifth', title: 'Five' }
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      renderLabel={({ route, focused }) => (
        <View style={styles.labelContainer}>
          <Icon 
            name={route.key === 'first' ? 'home' : route.key === 'second' ? 'settings' : route.key === 'third' ? 'flag' : route.key === 'fourth' ? 'cart' : 'person'} 
            size={20} 
            color={focused ? '#1877cf' : '#080808'} 
          />
          <Text style={{ color: focused ? '#1877cf' : '#080808'}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'lightblue' }}>
      {!welcome ?
        <SafeAreaView style={styles.container}>
          <Text style={{marginBottom: 50}}>Welcome to a Test App</Text>
          <Button
            title='Click to start'
            onPress={() => setWelcome(true)}
          />
        </SafeAreaView>
      :  
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: 400 }} // Ajuste conforme necessário
          renderTabBar={renderTabBar}
          style={{ flex: 1 }}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightyellow', 
    paddingTop: '8%',
    paddingHorizontal:'4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  indicator: {
    backgroundColor: 'blue',
  },
  labelContainer: {
    alignItems: 'center',
  },
});
