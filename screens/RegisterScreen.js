import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const userData = { name, surname, email, address, password };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    await AsyncStorage.setItem('userToken', 'abc123');
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Registro" />
        <Card.Content>
          <TextInput
            label="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Apellido"
            value={surname}
            onChangeText={setSurname}
            style={styles.input}
          />
          <TextInput
            label="Correo"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Dirección"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <TextInput
            label="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Registrarse
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


