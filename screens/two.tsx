import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";

const Two = () => {
  const [selected, setSelected] = useState([]);

  const items = [
    { id: 1, icon: 'logo-apple', name: 'Apple', color: '#FFB3BA', year: 2021, place: 'Brazil' },
    { id: 2, icon: 'person', name: 'Banana', color: '#FFDFBA', year: 2020, place: 'Canada' },
    { id: 3, icon: 'accessibility-outline', name: 'Mango', color: '#FFFFBA', year: 2022, place: 'Costa Rica' },
    { id: 4, icon: 'alarm-outline', name: 'Orange', color: '#BAFFC9', year: 2019, place: 'USA' },
    { id: 5, icon: 'american-football-outline', name: 'Lemmon', color: '#7fbceb', year: 2023, place: 'Dinamarca' },
    { id: 6, icon: 'aperture-outline', name: 'Cherry', color: '#bfa1f0', year: 2021, place: 'Italy' },
    { id: 7, icon: 'archive-outline', name: 'Watermelon', color: '#FFB3E6', year: 2020, place: 'Germany' },
    { id: 8, icon: 'bag-check', name: 'Peach', color: '#D9B3FF', year: 2022, place: 'South Africa' },
  ];


   return (
    <View style={styles.container}>
      <Text style={{ marginBottom: '50%' }}>Two Test</Text>
      
      <View style={styles.listContainer}>
        {/* Fade no início */}
        <LinearGradient
          colors={['#e2dddd', 'rgba(255, 255, 255, 0)']}
          style={[styles.fade, styles.fadeStart]} // Adicione a classe fadeStart
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        
        <FlatList
          data={items}
          horizontal={true}
          contentContainerStyle={styles.flatContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => {setSelected(item)}}            
              style={[styles.itemContainer,{backgroundColor: item.color}]}
            >
                <Icon name={item.icon} size={30} color='#1b1a1b' />
                <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
        
        {/* Fade no final */}
        <LinearGradient
          colors={['#e2dddd', 'rgba(255, 255, 255, 0)']}
          style={[styles.fade, styles.fadeEnd]} // Adicione a classe fadeEnd
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
      </View>

      {/* show when select item in flatlist */}
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text> Fields: </Text>
        <Text style={{fontSize: 20}}> {selected.id}</Text>
        <Text style={{fontSize: 20}}> {selected.name}</Text>
        <Text style={{fontSize: 20}}> {selected.place}</Text>
        <Text style={{fontSize: 20}}> {selected.year}</Text>
      </View>
    </View>
  );
};

export default Two;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: '8%',
    paddingHorizontal: '4%',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '20%',
    position: 'relative',
  },
  flatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    height: '100%',
    paddingHorizontal: '5%',
  },
  fade: {
    position: 'absolute',
    width: 30, // Ajuste a largura conforme necessário
    height: '80%',
    zIndex: 1,
  },
  fadeStart: {
    left: 0, // Posiciona o fade no início
  },
  fadeEnd: {
    right: 0, // Posiciona o fade no final
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    height: '70%',
  },
});