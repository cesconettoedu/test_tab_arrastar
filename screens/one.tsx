import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const One = () => {
  const [symbolInput, setSymbolInput] = useState(); 

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} 
      >
        <ScrollView
          style={{flex: 1, marginBottom: '20%'}}
          contentContainerStyle={{flexGrow: 1}}
        >
          <Text style={styles.title}>One Test - input com Keyboard Avoiding View One Test - input com Keyboard Avoiding View One Test - input com KeyboardAvoidingView</Text>
          <Text style={styles.title}>One Test - SafeAreaView</Text>
          <Text style={styles.title}>One Test - input com KeyboardAvoidingView</Text>
          <Text style={styles.title}>One Test - input com KeyboardAvoidingView</Text>
          <Text style={styles.title}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
          <Text style={styles.title}>One Test - input com KeyboardAvoidingView</Text>
          <Text style={styles.title}>One Test - input com KeyboardAvoidingView</Text>
          <Text style={styles.title}>One Test - SafeAreaView</Text>
          <Text style={styles.title}>One Test - input com KeyboardAvoidingView</Text>
          <Text style={styles.title}>One Test - SafeAreaView</Text>
          <Text style={styles.title}>One Test - input com KeyboardAvoidingView</Text>
          <Text style={styles.title}>One Test - input com KeyboardAvoidingView</Text>
 
          <TextInput
            style={styles.input}
            placeholder="_ _ _ _ _ _ _ _ "
            placeholderTextColor={'#1b1a1b'}
            value={symbolInput}
            onChangeText={() => setSymbolInput}
          />
          <TextInput
            style={styles.input}
            placeholder="_ _ _ _ _ _ _ _ "
            placeholderTextColor={'#1b1a1b'}
            value={symbolInput}
            onChangeText={() => setSymbolInput}
          />
        </ScrollView>
      </KeyboardAvoidingView>      
    </SafeAreaView>
  );
}

export default One;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightblue', 
    paddingTop: '10%',
    paddingHorizontal:'4%'
  },
  avoidingView: {
    flex: 1,
     // Centraliza o conteúdo
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: "50%",
    height: 50,
    paddingHorizontal: 10,
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 10, 
    alignSelf: 'center', // Centraliza o input
  }
});
