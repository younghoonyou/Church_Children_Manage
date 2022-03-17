import React,{useEffect} from 'react';
import 'react-native-gesture-handler';
import MainPage from './screens/MainPage';
import JoinPage from './screens/JoinPage';
import LoginPage from './screens/LoginPage';
import historyScreen from './screens/Scene/historyScreen';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  LogBox,
} from 'react-native';
const Stack = createStackNavigator();
const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
<>
<NavigationContainer>
  
      <Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="MainPage" component={MainPage} />
        <Stack.Screen options={{ headerShown: false }} name="JoinPage" component={JoinPage} />
        <Stack.Screen options={{ headerShown: false }} name="LoginPage" component={LoginPage} />
        <Stack.Screen options={{ headerShown: false }} name="historyScreen" component={historyScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
</>
  );
};

const styles = StyleSheet.create({
  
});

export default App;