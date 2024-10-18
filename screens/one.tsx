import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'

const One = () => {
  return (
    <View style={styles.container}>
      <Text>One Test</Text>
    </View>
  )
}

export default One

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightblue', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})