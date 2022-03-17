import React ,{useState} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Alert,
  LogBox
}from 'react-native';
  const historyScreen = ({navigation,route}) => {
    const [title, settitle] = useState('');
    const [contents, setcontents] = useState('');
    const data = route.params.Token;
    LogBox.ignoreLogs([
      'componentWillMount',
      'componentWillUpdate',
      'componentWillReceiveProps'
    ])
    return (
      <SafeAreaView style={styles.top}>
        <View style={styles.array}>
        <TouchableOpacity onPress={() =>{navigation.pop()}}>
        <View style={styles.button}>
            <Text style={styles.buttonword}>Cancle</Text>
        </View>
            </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          axios.post('http://127.0.0.1:8000/board/add-board/',
                  {
                    title: (title),
                    contents: (contents),
                  },
                  {
                    headers: {
                      Authorization:(data)
                    }
                  }
                ).then(function (response) {
                  console.log(response.status);
                  if(response.status==200)
                  return setTimeout(() => {
                       Alert.alert(                    // 말그대로 Alert를 띄운다
                        "Do you want Post?",                    // 첫번째 text: 타이틀 제목
                        "History",                         // 두번째 text: 그 밑에 작은 제목
                        [                              // 버튼 배열
                        {
                            text: "Cancel",                              // 버튼 제목
                            onPress: () => console.log("It is canceled"),     //onPress 이벤트시 콘솔창에 로그를 찍는다
                            style: "cancel"
                        },
                        { text: "Confirm", onPress: () => {console.log(response.data.message),navigation.pop()}}, //버튼 제목
                                                                                // 이벤트 발생시 로그를 찍는다
                        ],
                        { cancelable: false }
                    );
                },1000)
                }).catch(function (error){
                  console.log(error.response.data.message,error.response.status);
                  })
        }
        }>
        <View style={styles.button}>
            <Text style={styles.buttonword}>Confirm</Text>
        </View>
            </TouchableOpacity>
            </View>
      <View style={styles.container}>
        <View style={styles.body}>
            <View style={styles.board}>
                <View style={styles.titleback}>
        <TextInput style={styles.inputBox2}  
                placeholder="Title"
                placeholderTextColor='white'
                onChangeText={title => settitle(title)}/>
                </View>
                <View style={styles.context}>
                <TextInput style={styles.inputBox2}  
                placeholder="Contents"
                placeholderTextColor='white'
                onChangeText={contents => setcontents(contents)}/>
                </View>
        </View>
        </View>
        </View>
        </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aed0d2',
    flex: 1,
    
  },
  top:{
    backgroundColor: '#84a2a4',
    flex: 1,
  },
  body:{
    alignItems:'center',
  },
  word:{
    justifyContent:'center',
    fontSize:20,
    color:'white',
  },
  array:{
    justifyContent:'space-between',
    flexDirection:'row',
  },
  button:{
    backgroundColor: '#425152',
    width: 60,
    height: 40,
    borderRadius: 25,
    justifyContent:'center',
  },
  buttonword:{
    textAlign: 'center',
    fontWeight: 'bold',
    color:'white',
  },
  board:{
      width:350,
      height:650,
      backgroundColor:'#425152',
      marginTop:20,
      borderRadius:25,
      alignItems:'center',
      justifyContent:'space-between'
  },
  titleback:{
      flex:0.05,
      width:330,
      borderRadius:25,
      backgroundColor:'#aed0d2',
      marginTop:5,
  },
  inputBox2:{
    marginLeft:30,
    marginTop:5,
  },
  context:{
        flex:0.93,
        width:330,
        borderRadius:25,
        backgroundColor:'#aed0d2',
        marginBottom:10,
  }
});

export default historyScreen;