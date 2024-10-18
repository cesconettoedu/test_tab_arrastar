// consegui usando              
// expo install react-native-tab-view
// npm install --save react-native-vector-icons   , depois    npm i --save-dev @types/react-native-vector-icons


import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

import OnePage from './screens/one'
import TwoPage from './screens/two'
import ThirdPAge from './screens/third';


// Definindo as cenas
const renderScene = SceneMap({
  first: OnePage,
  second: TwoPage,
  third: ThirdPAge,
});

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'One' },
    { key: 'second', title: 'Two' },
    { key: 'third', title: 'Third' }
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      renderLabel={({ route, focused }) => (
        <View style={styles.labelContainer}>
          <Icon 
            name={route.key === 'first' ? 'home' : route.key === 'second' ? 'settings' : 'person'} 
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
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 400 }} // Ajuste conforme necessário
        renderTabBar={renderTabBar}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
