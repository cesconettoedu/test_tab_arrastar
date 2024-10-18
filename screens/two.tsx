import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'

const Two = () => {
  return (
    <View style={styles.container}>
      <Text>Two Test</Text>
    </View>
  )
}

export default Two

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightblue', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})