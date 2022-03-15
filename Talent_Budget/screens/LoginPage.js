import React from 'react';
import HomeScreen from './Scene/HomeScreen';
import ChatScreen from './Scene/ChatScreen';
import SettingsScreen from './Scene/SettingsScreen';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const LoginPage = ({route}) => {
  const data = route.params.Token
  // console.log(data)
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;

        if (route.name === '회의') {
          iconName = focused ? 'clipboard' : 'clipboard';
        } else if (route.name === '스티커'){
          iconName = focused ? 'heart' : 'heart';
        } else if (route.name === '아이들'){
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
        <Tab.Screen name="회의" component={HomeScreen} initialParams={{Token:data}}/>
        <Tab.Screen name="스티커" component={ChatScreen} initialParams={{Token:data}} />
        <Tab.Screen name="아이들" component={SettingsScreen} initialParams={{Token:data}}/>
      </Tab.Navigator>
  );
      };
export default LoginPage;