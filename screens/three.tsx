import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CounterContext = createContext();

const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const Counter = () => {
  const { count, setCount } = useContext(CounterContext);
  return (
    <View style={{marginTop: '30%', gap: 50 }}>
      <Text style={{alignSelf:'center', fontSize: 24}}>Count: {count}</Text>
      <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)} >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count - 1)} >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignSelf:'center'}}>
        <TouchableOpacity style={styles.button} onPress={() => setCount(0)} >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const Three = () => {
  return (
    <CounterProvider >
        <View style={styles.container}>
           <Counter />
        </View>
    </CounterProvider>
  )
}

export default Three

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightgreen', 
    paddingTop: '10%',
    paddingHorizontal:'4%'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '35%',
    height: 'auto',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
})