import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

export default function OrderScreen({ route, navigation }) {
  const { machine } = route.params;
  const [status, setStatus] = useState('Pedido aceptado');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleExtend = () => {
    setTimer(timer + 30);
  };

  const handleFinish = () => {
    setStatus('Pedido finalizado');
    setTimer(0);
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Estado del Pedido" />
        <Card.Content>
          <Text>Lavadora: {machine.name}</Text>
          <Text>{status}</Text>
          <Text>Tiempo restante: {timer} minutos</Text>
          <Button mode="contained" onPress={handleExtend} style={styles.button}>
            Extender Tiempo
          </Button>
          <Button mode="contained" onPress={handleFinish} style={styles.button}>
            Finalizar Pedido
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 16,
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

