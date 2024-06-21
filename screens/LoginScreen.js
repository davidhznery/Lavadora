import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      await AsyncStorage.setItem('userToken', user.uid);
      navigation.navigate(user.email === 'admin@example.com' ? 'Admin' : 'Search');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Iniciar Sesión" />
        <Card.Content>
          <TextInput
            label="Correo"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button} labelStyle={{ textTransform: 'none' }}>
            Iniciar Sesión
          </Button>
          <Button onPress={() => navigation.navigate('Register')} style={styles.button} labelStyle={{ textTransform: 'none' }}>
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

