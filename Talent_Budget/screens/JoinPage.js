import React ,{useState,useContext}from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
  LogBox
} from 'react-native';
LogBox.ignoreLogs([
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps'
])
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
      return "Wrong Password"
    }
  };
  function error2(){
    if(((phone_number.length)!=(11))&&(phone_number!='')){
      return "Please Enter 11 length"
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

  const Server = async () => {
    const response = await axios.post('http://52.79.201.37:8000/account/sign-up/',
    {
      name: (name),
      password: (password),
      phone_number: (phone_number),
    });
    if(response.status == 201){
      return Promise.resolve(setLoading(true),setTimeout(() => {
        setLoading(false);
      Alert.alert(     // 받아온 response값이 200이면 Alert.alert적용 return 지우기
        "Glad to join us",
        "God Bless You",
        [
          {
            text:"Confirm",onPress:()=>navigation.navigate('MainPage'),
            
          }
        ]
      )},3000));
    }
    else{
      return Promise.reject('It does not work');
    }
  }
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
                placeholder="Name"
                placeholderTextColor='white'
                onChangeText={name => setname(name)}/>
                <TextInput style={styles.inputBox2}  
                placeholder="Phone Number"
                placeholderTextColor='white'
                onChangeText={phone_number => setphone_number(phone_number)}
                keyboardType="number-pad"/>
                </View>
                <View style={styles.container}>
                <TextInput style={styles.inputBox}  
                placeholder="Password"
                placeholderTextColor='white'
                secureTextEntry={true}
                onChangeText={password => setpassword(password)}/>
                <TextInput style={styles.inputBox}  
                placeholder="Password Confirm"
                placeholderTextColor='white'
                secureTextEntry={true}
                onChangeText={passwordconfirm => setpasswordconfirm(passwordconfirm)}/>

                <TouchableOpacity
                
                onPress={()=>{Server().then((response)=>{
                  // console.log(response);
                }).catch(console.log)}}
                // onPress={()=>{setLoading(true),axios.post('http://127.0.0.1:8000/account/sign-up/',
                //   {
                //     name: (name),
                //     password: (password),
                //     phone_number: (phone_number),
                //   }).then(function(response){
                //   if(response.status==201)// 
                //   return setTimeout(() => {
                //     setLoading(false);
                //   Alert.alert(     // 받아온 response값이 200이면 Alert.alert적용 return 지우기
                //     "Glad to join us",
                //     "God Bless You",
                //     [
                //       {
                //         text:"Confirm",onPress:()=>navigation.navigate('MainPage'),
                        
                //       }
                //     ]
                //   )},3000)//response.data.access_token -> user 
                // }).catch(function (error){
                //   console.log(error.response.data.message,error.response.status);
                //   })}}
                disabled={op()}
                style={op() ? styles.button:styles.button2}>
                    <Text style={styles.buttonText}>Confirm</Text>
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
                placeholder="Jesus Loves You"
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