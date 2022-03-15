import React,{useState,useEffect,createContext}  from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Text,
  StatusBar,
  Vibration
} from 'react-native';
import { useReducer } from 'react';
const data = createContext();
const MainPage = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [user,setuser]=useState('');
  const Token = (user)
  useEffect(() => console.log(user), [user]);
  return (
    
    <>
    <data.Provider value={Token}/>
<StatusBar barStyle="dark-content" />
  <View style={styles.body}>
   <View style={styles.blank}>
   <ImageBackground 
          source={require('../image/jesus2.png')}
          style={styles.background}
          imageStyle={styles.logo}>
   </ImageBackground>
   <ImageBackground 
          source={require('../image/church.png')}
          style={styles.background}
          imageStyle={styles.logo2}>
   </ImageBackground>
   <ImageBackground 
          source={require('../image/logo.png')}
          style={styles.background}
          imageStyle={styles.logo3}>
   </ImageBackground>
         <View style={styles.container}>
         
                <TextInput 
                
                style={styles.inputBox1}  
                placeholder="전화번호"
                
                placeholderTextColor='white'
                onChangeText={phone_number => setphone_number(phone_number)}>
                  
                  </TextInput>
                <TextInput style={styles.inputBox2}  
                placeholder="비밀번호"
                placeholderTextColor='white'
                secureTextEntry={true}
                onChangeText={password=> setpassword(password)}
                />
                <TouchableOpacity style={styles.button}
                // onPress={() => Vibration.vibrate()}
                onPress={()=>{Vibration.vibrate(),
                  axios.post('http://127.0.0.1:8000/account/sign-in/', {
                    phone_number: (phone_number),
                    password: (password)
                  })
                  .then(function (response) {
                    console.log(response.data.message,response.status);
                    if(response.status==200)
                    setuser(response.data.access_token);
                    // user.push(response.data.access_token);
                    // console.log(user);
                    return navigation.navigate('LoginPage',{Token:response.data.access_token,})
                  })
                  .catch(function (error) {
                    console.log(error.response.data.message,error.response.status);
                  });
                }}
                >
                <Text style={styles.buttonText}>로그인
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} 
                onPress={() => navigation.navigate('JoinPage')}>
                    <Text style={styles.buttonText}>회원가입
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
  </View>
          <View style={styles.bottom}>
          <Text style={styles.word}  textAlign='center'>하나님을 기쁘시게 하는 교회</Text>
          </View>
          
          
</>
    );
    
  }

const styles = StyleSheet.create({
  container: {
        
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
},
inputBox1: {
    marginTop: 10,
    width: 400,
    height: 50,
    backgroundColor: '#738e90',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 18,
},
inputBox2: {
  marginTop: 10,
  width: 400,
  height: 50,
  backgroundColor: '#738e90',
  borderRadius: 25,
  paddingHorizontal: 16,
  fontSize: 18,
},
button: {
    marginTop: 10,
    backgroundColor: '#425152',
    width: 400,
    height: 60,
    borderRadius: 25,
    paddingHorizontal: 16,
},
buttonText: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
},
  background: {
    paddingBottom: 40,
    paddingTop: 96,
  },
  logo: {
    width: 250,
    height: 600,
    opacity: 0.7,
    overflow: 'visible',
    marginLeft: -20,
  },
  logo2: {
    width: 200,
    height: 200,
    opacity: 1,
    overflow: 'visible',
    marginLeft: 110,
    marginTop: 100,
  },
  logo3: {
    width: 150,
    height: 100,
    opacity: 1,
    overflow: 'visible',
    marginLeft: 250,
    marginTop: -280,
  },
  // blank: {
  //   alignItems: 'center',
  //   paddingBottom: 400,
  // },
  top: {
    backgroundColor: 'white',
    marginTop: 40,
  },
  bottom: {
    backgroundColor: '#84a2a4',
    paddingBottom: 40,
  },
  body: {
    backgroundColor: '#aed0d2',
    flex: 1,
    alignItems: 'center',
  },
  word: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'white',
  },
  blank: {
    backgroundColor: '#aed0d2',
    flex: 1,
    marginTop: 50,
  },
});
export {data}
export default MainPage;