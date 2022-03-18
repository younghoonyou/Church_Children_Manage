import React from 'react';
import HomeScreen from './Scene/HomeScreen';
import ChatScreen from './Scene/ChatScreen';
import SettingsScreen from './Scene/SettingsScreen';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps'
])
const Tab = createBottomTabNavigator();
const LoginPage = ({route}) => {
  const data = route.params.Token
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;

        if (route.name === 'History') {
          iconName = focused ? 'clipboard' : 'clipboard';
        } else if (route.name === 'Schedule'){
          iconName = focused ? 'heart' : 'heart';
        } else if (route.name === 'Children'){
          iconName = focused ? 'people' : 'people';
        }
        return <Iconicons name={iconName} size={50}  color={color}/>;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#72604c',
      inactiveTintColor: '#c8b8a7',
      style: {backgroundColor: '#84a2a4',
      height: 100,
            }
          }
        } >
        <Tab.Screen name="History" component={HomeScreen} initialParams={{Token:data}}/>
        <Tab.Screen name="Schedule" component={ChatScreen} initialParams={{Token:data}} />
        <Tab.Screen name="Children" component={SettingsScreen} initialParams={{Token:data}}/>
      </Tab.Navigator>
  );
      };
export default LoginPage;