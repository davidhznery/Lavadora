import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { firestore } from '../firebase';

export default function CartScreen({ route, navigation }) {
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (route.params?.machine) {
      const newCart = [...cart, route.params.machine];
      setCart(newCart);
      AsyncStorage.setItem('cart', JSON.stringify(newCart));
    }
  }, [route.params?.machine, cart]);

  const handleCheckout = async () => {
    if (!location) {
      alert('Por favor comparte tu ubicación antes de realizar el pedido');
      return;
    }

    const orderDetails = {
      cart,
      location,
      user: await AsyncStorage.getItem('userData'),
    };

    try {
      const docRef = await firestore.collection('orders').add(orderDetails);
      alert('Pedido realizado exitosamente');
      await AsyncStorage.removeItem('cart');
      setCart([]);
      navigation.navigate('Search');
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    }
  };

  const shareLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso de ubicación denegado');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Text>Descripción: {item.description}</Text>
              <Text>Precio: {item.price}</Text>
            </Card.Content>
          </Card>
        )}
      />
      <Button mode="contained" onPress={shareLocation} style={styles.button}>
        Compartir Ubicación
      </Button>
      <Button mode="contained" onPress={handleCheckout} style={styles.button}>
        Finalizar Pedido
      </Button>
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
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
  error: {
    color: 'red',
    marginTop: 10,
  },
});


