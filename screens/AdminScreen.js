import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { firestore } from '../firebase';

export default function AdminScreen() {
  const [machines, setMachines] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchMachines = async () => {
      const machinesList = [];
      const querySnapshot = await firestore.collection('machines').get();
      querySnapshot.forEach(doc => {
        machinesList.push({ id: doc.id, ...doc.data() });
      });
      setMachines(machinesList);
    };
    fetchMachines();
  }, []);

  const addMachine = async () => {
    const newMachine = { name, description, price };
    const docRef = await firestore.collection('machines').add(newMachine);
    setMachines([...machines, { id: docRef.id, ...newMachine }]);
    setName('');
    setDescription('');
    setPrice('');
  };

  const removeMachine = async (id) => {
    await firestore.collection('machines').doc(id).delete();
    setMachines(machines.filter(machine => machine.id !== id));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Agregar Lavadora" />
        <Card.Content>
          <TextInput
            label="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            label="Precio"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" onPress={addMachine} style={styles.button}>
            Agregar
          </Button>
        </Card.Content>
      </Card>
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Text>Descripción: {item.description}</Text>
              <Text>Precio: {item.price}</Text>
              <Button mode="contained" onPress={() => removeMachine(item.id)} style={styles.button}>
                Eliminar
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
  input: {
    marginBottom: 12,
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

