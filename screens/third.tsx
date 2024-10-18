import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'

const Third = () => {
  return (
    <View style={styles.container}>
      <Text>Third Test</Text>
    </View>
  )
}

export default Third

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightblue', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})