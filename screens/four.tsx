import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const four = () => {
  return (
    <View style={styles.container}>
      <Text>four</Text>
    </View>
  )
}

export default four

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'pink', 
    paddingTop: '8%',
    paddingHorizontal:'4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})