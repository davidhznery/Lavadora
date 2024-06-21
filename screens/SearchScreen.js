import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchScreen({ navigation }) {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      const storedMachines = await AsyncStorage.getItem('machines');
      if (storedMachines) {
        setMachines(JSON.parse(storedMachines));
      }
    };
    fetchMachines();
  }, []);

  const addToCart = (machine) => {
    // Aquí puedes agregar lógica para agregar la lavadora al carrito
    navigation.navigate('Cart', { machine });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Text>Descripción: {item.description}</Text>
              <Text>Precio: {item.price}</Text>
              <Button mode="contained" onPress={() => addToCart(item)} style={styles.button}>
                Agregar al Carrito
              </Button>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'transparent',
    shadowRadius: 0,
  },
});



