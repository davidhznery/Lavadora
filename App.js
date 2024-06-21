import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import OrderScreen from './screens/OrderScreen';
import AdminScreen from './screens/AdminScreen';
import CartScreen from './screens/CartScreen';
import { auth } from './firebase'; // Importa la instancia de auth de Firebase

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuthenticated(true);
          setIsAdmin(user.email === 'admin@example.com');
          AsyncStorage.setItem('userToken', user.uid);
        } else {
          setIsAuthenticated(false);
        }
      });
    };
    checkAuthStatus();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? (isAdmin ? "Admin" : "Search") : "Login"}>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
