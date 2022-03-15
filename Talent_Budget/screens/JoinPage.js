import React ,{useState,useContext}from 'react';
import axios from 'axios';
import global from './global';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert
} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { createContext } from 'react/cjs/react.development';
const JoinPage = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [passwordconfirm, setpasswordconfirm] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [name, setname] = useState('');
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(false);
  // const data = createContext(user);
  function error1(){
    if(((password)!=(passwordconfirm))&&(password!='')&&(passwordconfirm!='')){
      return "비밀번호가 맞지 않습니다"
    }
  };
  function error2(){
    if(((phone_number.length)!=(11))&&(phone_number!='')){
      return "전화번호 11자리를 입력해주세요"
    }
  };
  function op(){
    if((((password)!=(passwordconfirm))||(name=='')||(phone_number=='')||(phone_number.length!=11)||(password=='')||(passwordconfirm==''))==true){
      return true
    }
    if((((password)!=(passwordconfirm))||(name=='')||(phone_number=='')||(phone_number.length!=11||(password=='')||(passwordconfirm=='')))==false){
    return false
    }
  };
 
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };
  return (
    <>
        <View style={styles.view}>
            
            <TouchableOpacity style={styles.back} onPress={() => {navigation.pop()}}>
            <Iconicons name={'arrow-back-circle-outline'} size={50}  color={'white'}/>
            </TouchableOpacity>
            
            
            <ImageBackground 
          source={require('../image/jesus2.png')}
          style={styles.background}
          imageStyle={styles.logo}>
   </ImageBackground>
   <ImageBackground 
          source={require('../image/logo.png')}
          style={styles.background}
          imageStyle={styles.logo3}>
   </ImageBackground>
  
   <View style={styles.blank}>
   <ActivityIndicator style={styles.bar} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} animating={loading} size={'large'} color={'black'}/>
   <View stlye={styles.logbutton}>
            
                <View style={styles.name}>
                
                <TextInput style={styles.inputBox2}  
                placeholder="이름"
                placeholderTextColor='white'
                onChangeText={name => setname(name)}/>
                <TextInput style={styles.inputBox2}  
                placeholder="전화번호"
                placeholderTextColor='white'
                onChangeText={phone_number => setphone_number(phone_number)}
                keyboardType="number-pad"/>
                </View>
                <View style={styles.container}>
                <TextInput style={styles.inputBox}  
                placeholder="비밀번호"
                placeholderTextColor='white'
                secureTextEntry={true}
                onChangeText={password => setpassword(password)}/>
                <TextInput style={styles.inputBox}  
                placeholder="비밀번호 확인"
                placeholderTextColor='white'
                secureTextEntry={true}
                onChangeText={passwordconfirm => setpasswordconfirm(passwordconfirm)}/>

                <TouchableOpacity
                
                onPress={()=>{setLoading(true),axios.post('http://127.0.0.1:8000/account/sign-up/',
                  {
                    name: (name),
                    password: (password),
                    phone_number: (phone_number),
                  }).then(function(response){
                    // setuser(response.data.access_token);
                    // user.push(response.data.access_token);
                    // export const token_data = createContext(response.data.access_token)
                    // setuser(user => user.concat(response.data.access_token))
                    // console.log(token_data._currentValue)
                    // console.log(user);
                    // console.log(data);
                  if(response.status==201)// 
                  return setTimeout(() => {
                    setLoading(false);
                  Alert.alert(     // 받아온 response값이 200이면 Alert.alert적용 return 지우기
                    "가입을 축하드립니다",
                    "빛이 있으라",
                    [
                      {
                        text:"확인",onPress:()=>navigation.navigate('MainPage'),
                        
                      }
                    ]
                  )},3000)//response.data.access_token -> user 
                }).catch(function (error){
                  console.log(error.response.data.message,error.response.status);
                  })}}
                disabled={op()}
                style={op() ? styles.button:styles.button2}>
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
            </View>
            <View setlye={styles.errorblank}>
                <Text style={styles.error}>{error1()}</Text>
                <Text style={styles.error}>{error2()}</Text>
            </View>
        </View>
    </View>
</View>
                <View style={styles.bottom}>
          <TextInput style={styles.word}  
                placeholder="하나님을 기쁘시게 하는 교회"
                placeholderTextColor='white'
                textAlign='center'/>
          </View>
          
        </>
    );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#aed0d2',
    flex: 1,
  },
  back:{
        marginTop:40,
        // paddingTop:80,
        marginLeft:5,
        marginRight:330,
  },
  error:{
    color:'red',
    fontSize: 17,
    textAlign:'center',
  },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 55,
    },
    name: {
        paddingTop: 30,
        flexDirection: 'row',
    },
    inputBox: {
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
        width: 200,
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
        opacity:0.3,
    },
    button2: {
      marginTop: 10,
      backgroundColor: '#425152',
      width: 400,
      height: 60,
      borderRadius: 25,
      paddingHorizontal: 16,
      opacity:1,
  },
    buttonText: {
        marginTop: 15,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
      bottom: {
        backgroundColor: '#84a2a4',
        paddingBottom: 0,
      },
      background: {
        marginBottom: 150,
        marginTop: -10,
      },
      logo: {
        width: 250,
        height: 600,
        opacity: 0.7,
        overflow: 'visible',
        marginLeft: -20,
        marginTop: 10
      },
      blank: {
        alignItems: 'center',
        paddingBottom: 390,
      },
      top: {
        
      },
      bottom: {
        backgroundColor: '#84a2a4',
        paddingBottom: 40,
      },
      word: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      logo3: {
        width: 150,
        height: 100,
        opacity: 1,
        overflow: 'visible',
        marginLeft: 250,
        marginTop: -180,
      },
      bar:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:-50,
      },
      spinnerTextStyle:{
        color:'black',
      },
    });
export default JoinPage