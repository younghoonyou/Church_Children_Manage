import React,{useState} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Swipeout from 'react-native-swipeout';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
  LogBox,
}from 'react-native';
import { useEffect } from 'react';
import AWS_PUBLIC_ADDR from '../../../backend/mysite/mysite/settings.py'
Room_color = function(mycolor) {
  return {
    borderRadius: 10,
    backgroundColor: mycolor,
    width:400,
    padding: 20,
    marginVertical: 5,
    justifyContent:'space-between',
    flexDirection:'row',
  }
}
LogBox.ignoreLogs(['warning: ...']);
LogBox.ignoreLogs([
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps'
])
function Room_auto(room_name){
  if((room_name)=='Green'){
    return Room_color('#d2f1db')
  }
  else if((room_name)=='Orange'){
    return Room_color('#f1f0e7')
  }
  else if((room_name)=='Blue'){
    return Room_color('#d0e8fe')
  }
  else if((room_name)=='Red'){
    return Room_color('#eddfde')
  }
  else
  return Room_color('#deeced')
}
function accordion(room_name){
  if((room_name)=='Green'){
    return Room_color('#a8c0af')
  }
  else if((room_name)=='Orange'){
    return Room_color('#c0c0b8')
  }
  else if((room_name)=='Blue'){
    return Room_color('#a6b9cb')
  }
  else if((room_name)=='Red'){
    return Room_color('#bdb2b1')
  }
  else
  return Room_color('#deeced')
}
  const SettingsScreen = ({route}) => {
    const Item = ({ title,room_name,age,id }) => {
      const right_buttons = swipeoutBtns_delete(title,id,room_name);
      const left_buttons = swipeoutBtns_adjust(age);
      return(
      <Swipeout autoClose={true} style={styles.back} right={right_buttons} left={left_buttons}>
        {/* <TouchableOpacity> */}
      <Collapse>
      <CollapseHeader>
      <View style={Room_auto(room_name)}>
        <Text style={styles.title}>{title}   {age} Ages</Text>
        <Text style={styles.room_name}>{room_name}</Text>
      </View>
      {/* </TouchableOpacity> */}
      </CollapseHeader>
      <CollapseBody>
      <View style={accordion(room_name)}>
      <Text style={styles.title}>Talent:</Text>
        <Text style={styles.title}>{'\u0024'}</Text>
      </View>
    </CollapseBody>
      </Collapse>
      </Swipeout>
      )};
    const AWS_URL_DELETE_CHILD = 'http://' + AWS_PUBLIC_ADDR + ':8000/child/delete-child/';
    const swipeoutBtns_delete =(item,id,room_name)=>[
      {
        text: 'Delete',
        type:'delete',
        backgroundColor:'red',
        autoColse:true,
        component:(
          <View style={{alignItems:'center',marginTop:20}}>
            <Iconicons name={'trash-outline'} size={50}  color={'white'}/>
          </View>
            ),
        onPress:()=>{
          Alert.alert(
            'Do you want to delete?',
            item,
            [
              {
                text: "Cancel",
                onPress : () => console.log("It is canceled"),
                style: "cancel"
              },
              {
                text: "Confirm",
                onPress: () => {axios.delete(AWS_URL_DELETE_CHILD,
                {
                 headers:{
                  Authorization:(user)
                 },
                 data:{
                   id:(id)
                 }
                }
                ).then(function (response) {
                  console.log(response.data.message);
                  if(response.status==200)// return setTimeout(() => {
                    return Alert.alert(     // 받아온 response값이 200이면 Alert.alert적용
                      (item)+" is deleted",
                      (room_name)+"Room",
                      [
                        {
                          text:"Confim",onPress:()=>{onRefresh(),console.log(response.data.message,response.status)}
                        }
                      ]
                    )
                }).catch(function (error){
                  console.log(error.response.data.message,error.response.status);
                  })},
                style: "confirm"
              },
          ],
          {cancelable: true}
          );
        }
      }
    ];
    const swipeoutBtns_adjust =(item)=>[
      {
        text: 'Adjust',
        type:'default',
        backgroundColor:'#d1eff9',
        component:(
          <View style={{alignItems:'center',marginTop:20}}>
            <Iconicons name={'build-outline'} size={50}  color={'white'}/>
          </View>
            ),
        onPress:()=>{
          Alert.alert(
            'What will you adjust?',
            [
              {
                text: "Name",
                onPress: () => console.log("It is canceled"),
                style: "cancel"
              },
              {
                text: "Age",
                onPress: () => console.log("Confirmed"),
                style: "confirm"
              },
              {
                text: "Room",
                onPress: () => console.log("confirm"),
              },{
                text: "Cancel",
                style:'cancel',
              }
          ],
          {cancelable: true}
          );
        }
      }
    ]
  const [refreshing, setRefreshing] = useState(false);
  const [child_name, setchild_name] = useState('');
  const [room, setroom] = useState('');
  const [grade, setgrade] = useState('');
  const [child_name_list, setchild_name_list] = useState([]);
  const user = route.params.Token
  const AWS_URL_ADD_CHILD = 'http://' + AWS_PUBLIC_ADDR + ':8000/child/add-child/';

  const onRefresh = () => {
    //Clear old data of the list
    setchild_name_list([]);
    //Call the Service to get the latest data
    getUsers().then(
      (response)=>{
        console.log(response.data.childs);
        setchild_name_list(response.data.childs);
      }
    ).catch(console.log);
  };
  async function PostUsers(room,child_name,grade){
    const response = await axios.post(AWS_URL_ADD_CHILD,
    {
      child_name: (child_name),
      room: (room),
      grade: (grade),
    },{
      headers: {
        Authorization:(user)
      }
    });
    if(response.status == 200){
      return Promise.resolve(console.log(child_name,room,grade),
        Alert.alert(     // 받아온 response값이 200이면 Alert.alert적용
          (child_name)+" is added",
          (room)+"room",
          [
            {
              text:"Confirm",onPress:()=>{onRefresh()}
            }
          ]
        )
      );//
    }
    else{
      return Promise.reject('File not found');
    }
  }
  function ADD_CHILD(room,child_name,grade){
    console.log(room,child_name,grade,'hihi');
    PostUsers(room,child_name,grade).then((response)=>{}).catch(console.log)
  }
  function SetAge_function(room,child_name,user){
    setchild_name(child_name);
    console.log(room,child_name,grade);
    Alert.prompt(
      'How old are you?',
      'In Number',
      [
        {
          text:"Cancel",
          onPress: ()=>console.log("It is canceled"),
          style: "cancel"
        },
        {
          text: "Confirm",
          style: "confirm",
          onPress: (grade)=> {grade =>{setgrade(grade)},console.log(grade),ADD_CHILD(room,child_name,grade)}
        }
      ]
    )
  }

  const getUsers = async () => {
    const response = await axios.get(AWS_URL_ADD_CHILD);
    if(response.status == 203){
      const jsonValue = await response;
      return Promise.resolve(jsonValue);//
    }
    else{
      return Promise.reject('File not found');
    }
  };

    const renderItem = ({item}) => (
      
      <Item title={item.child_name} room_name={item.room} age={item.grade} style={styles.back} id={item.id}/>
    );
    useEffect(()=>{
      onRefresh();
    },[])

    return (
      <SafeAreaView style={styles.top}>
        <View style={styles.array}>
        <TouchableOpacity onPress={() => {}}>
            <Iconicons name={'trash-outline'} size={40}  color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.word}>Children</Text>
        <TouchableOpacity onPress={() => {
          Alert.prompt(
            'Please Enter Name',
  'Name',
  [
    {
      text: "Cancel",                              // 버튼 제목
      onPress: () => console.log("It is canceled"),     //onPress 이벤트시 콘솔창에 로그를 찍는다
      style: "confirm"
    },
    {
      text: 'Confirm',
      onPress: (child_name) =>{child_name =>{setchild_name(child_name)},console.log(child_name),Alert.alert(
        'Room name',
        'Room',
        [
          { 
            text:"Green",
            style:"confirm",
            onPress: ()=>{setroom('Green'),SetAge_function('Green',child_name,user)}
          },
          {
            text:"Blue",
            style:"confirm",
            onPress: ()=>{setroom('Blue'),SetAge_function('Blue',child_name,user)}
          },
          {
            text:"Orange",
            style:"confirm",
            onPress: ()=>{setroom('Orange'),SetAge_function('Orange',child_name,user)}
          },
          {
            text:"Red",
            style:"confirm",
            onPress: ()=>{setroom('Red'),SetAge_function('Red',child_name,user)}
          },
          {
            text: "Cancel",
            style:"cancle",
          }
        ]
        ,
          {
            text: "Confirm",
            style: "confirm",
            onPress: (room) =>{room =>{setroom(room)},console.log(room),Alert.prompt(
              'Name',
              'Type in Number',
              [
                {
                  text:"Cancel",
                  onPress: ()=>console.log("입력취소"),
                  style: "cancel"
                },
                {
                  text: "confirm",
                  style: "confirm",
                  onPress: (grade)=> {grade =>{setgrade(grade)},console.log(grade),onRefresh()}
                }
              ]
            )} 
          }
        // ]
      )}
    }
  ]
  )
        }}>
            <Iconicons name={'add-circle-outline'} size={40}  color={'white'}/>
            </TouchableOpacity>
            </View>
      <View style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
        data={child_name_list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}/>}
              />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aed0d2',
    flex: 1,
    // alignItems:'center',
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
  item: {
    backgroundColor: '#deeced',
    width:400,
    padding: 20,
    marginVertical: 5,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  title: {
    fontSize: 32,
  },
  room_name: {
    fontSize: 24,
  },
  back:{
    backgroundColor: '#aed0d2',
  },
});

export default SettingsScreen;