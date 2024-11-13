import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'

const four = () => {

  const { width, height, fontScale } = useWindowDimensions();

  //somente por no Android ele da o com muitos decimos, ex. 731.129923
  const intWidth = Math.floor(width);
  const intHeight = Math.floor(height);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 22, marginBottom: '10%'}}>Windows dimensions</Text>
      <Text>Width: {intWidth}</Text>
      <Text>Height: {intHeight}</Text>
      <Text>Font Scale: {fontScale}</Text>
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