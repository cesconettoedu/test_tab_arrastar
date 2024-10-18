import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'

const Three = () => {
  return (
    <View style={styles.container}>
      <Text>Three Test</Text>
    </View>
  )
}

export default Three

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightgreen', 
    paddingTop: '8%',
    paddingHorizontal:'4%'
  }
})