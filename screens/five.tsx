import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Five = () => {

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 22, marginBottom: '10%'}}>Create Alarms Notifications</Text>
     
    </View>
  )
}

export default Five

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightyellow', 
    paddingTop: '8%',
    paddingHorizontal:'4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})