import React,{useState} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Swipeout from 'react-native-swipeout';
import NumberPlease from "react-native-number-please";
import RNPickerSelect from 'react-native-picker-select';
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
  } 
  from 'react-native';
import { useEffect } from 'react';
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
function Room_auto(room_name){
  if((room_name)=='믿음'){
    return Room_color('#d2f1db')
  }
  else if((room_name)=='해마루'){
    return Room_color('#f1f0e7')
  }
  else if((room_name)=='가이오'){
    return Room_color('#d0e8fe')
  }
  else if((room_name)=='레드'){
    return Room_color('#eddfde')
  }
  else
  return Room_color('#deeced')
}
function accordion(room_name){
  if((room_name)=='믿음'){
    return Room_color('#a8c0af')
  }
  else if((room_name)=='해마루'){
    return Room_color('#c0c0b8')
  }
  else if((room_name)=='가이오'){
    return Room_color('#a6b9cb')
  }
  else if((room_name)=='레드'){
    return Room_color('#bdb2b1')
  }
  else
  return Room_color('#deeced')
}

  // const Item = ({ title,room_name,age }) => (
  //   <Swipeout autoClose={true} style={styles.back} right={swipeoutBtns_delete} left={swipeoutBtns_adjust}>
  //   <View style={Room_auto(room_name)}>
  //     <Text style={styles.title}>{title}   {age}</Text>
  //     <Text style={styles.room_name}>{room_name}</Text>
  //   </View>
  //   </Swipeout>
  // );
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
        <Text style={styles.title}>{title}   {age}살</Text>
        <Text style={styles.room_name}>{room_name}</Text>
      </View>
      {/* </TouchableOpacity> */}
      </CollapseHeader>
      <CollapseBody>
      <View style={accordion(room_name)}>
      <Text style={styles.title}>달란트:</Text>
        <Text style={styles.title}>{'\u0024'}</Text>
      </View>
    </CollapseBody>
      </Collapse>
      </Swipeout>
      )};
    const swipeoutBtns_delete =(item,id,room_name)=>[
      {
        text: '삭제',
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
            '삭제하시겠습니까?',
            item,
            [
              {
                text: "취소",
                onPress : () => console.log("입력취소"),
                style: "cancel"
              },
              {
                text: "확인",
                onPress: () => {axios.delete('http://127.0.0.1:8000/child/delete-child/',
                {
                 headers:{
                  Authorization:(user)
                 },
                 data:{
                   id:(id)
                 }
                }
                ).then(function (response) {
                  console.log(response.status);
                  if(response.status==200)// return setTimeout(() => {
                    return Alert.alert(     // 받아온 response값이 200이면 Alert.alert적용
                      (item)+"가(이) 삭제되었습니다.",
                      (room_name)+"반",
                      [
                        {
                          text:"확인",onPress:()=>{onRefresh(),console.log(response.data.message,response.status)}
                        }
                      ]
                    )
                  // },200)
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
        text: '수정',
        type:'default',
        backgroundColor:'#d1eff9',
        component:(
          <View style={{alignItems:'center',marginTop:20}}>
            <Iconicons name={'build-outline'} size={50}  color={'white'}/>
          </View>
            ),
        onPress:()=>{
          Alert.alert(
            '삭제하시겠습니까?',
            'hi',
            [
              {
                text: "취소",
                onPress: () => console.log("입력취소"),
                style: "cancel"
              },
              {
                text: "확인",
                onPress: () => console.log("확인"),
                style: "confirm"
                
              },
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
  const [send, setsend] = useState(false);
  const [child_name_list, setchild_name_list] = useState([]);
  const user = route.params.Token
  const selectedItem = {
    title: 'Selected item title',
    description: 'Secondary long descriptive text ...',
};

// export 
const Dropdown = () => {
    return (
        <RNPickerSelect
            pickerProps={{
                accessibilityLabel: selectedItem.title,
            }}
        >
            <Text>{selectedItem.title}</Text>
            <Text>{selectedItem.description}</Text>
        </RNPickerSelect>
    );
};
  const onRefresh = () => {
    //Clear old data of the list
    setchild_name_list([]);
    //Call the Service to get the latest data
    getUsers();
  };

  const getUsers = async () => {
    const response = await axios.get('http://127.0.0.1:8000/child/add-child/')
    console.log(response.data.childs);
    setchild_name_list(response.data.childs);
  };
  
    const renderItem = ({item}) => (
      
      <Item title={item.child_name} room_name={item.room} age={item.grade} style={styles.back} id={item.id}/>
    );
    useEffect(()=>{
   
    getUsers();
     console.log(child_name_list)
    
    },[])


    return (
      <SafeAreaView style={styles.top}>
        <View style={styles.array}>
        <TouchableOpacity onPress={() => {}}>
            <Iconicons name={'trash-outline'} size={40}  color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.word}>아이들</Text>
        <TouchableOpacity onPress={() => {
          Alert.prompt(
            '이름을 입력해주세요.',
  '이름',
  [
    {
      text: "취소",                              // 버튼 제목
      onPress: () => console.log("입력취소."),     //onPress 이벤트시 콘솔창에 로그를 찍는다
      style: "confirm"
    },
    {
      text: '확인',
      onPress: (child_name) =>{child_name =>{setchild_name(child_name)},console.log(child_name),Alert.alert(
        '반을 입력해주세요.',
        '반 이름',
        [
          { 
            text:"믿음반",
            style:"confirm",
            onPress:()=>{console.log("믿음반"),setroom('믿음'),Alert.alert(
              [
                {
                  
                }
              ]
            )},
          },
          {
            text:"가이오반",
            style:"confirm",
            onPress:()=>{console.log("가이오반"),setroom('가이오')},
          },
          {
            text:"해마루반",
            style:"confirm",
            onPress:()=>{console.log("해마루반"),setroom('해마루')},
          },
          {
            text:"레드반",
            style:"confirm",
            onPress:()=>{console.log("레드반"),setroom('레드')},
          },
          {
            text: "취소",
            style:"cancle",
            onPress: () => console.log("입력취소."),
          }
        ]
        ,
          {
            text: "확인",
            style: "confirm",
            onPress: (room) =>{room =>{setroom(room)},console.log(room),Alert.prompt(
              '나이를 입력해주세요',
              '숫자로만 입력하세요',
              [
                {
                  text:"취소",
                  onPress: ()=>console.log("입력취소"),
                  style: "cancel"
                },
                {
                  text: "확인",
                  style: "confirm",
                  onPress: (grade)=> {grade =>{setgrade(grade)},console.log(grade),axios.post('http://127.0.0.1:8000/child/add-child/',
                  {
                    child_name: (child_name),
                    room: (room),
                    grade: (grade),
                  },{
                    headers: {
                      Authorization:(user)
                    }
                  }).then(function (response) {
                  console.log(response.status);
                  if(response.status==200)// return setTimeout(() => {
                    return Alert.alert(     // 받아온 response값이 200이면 Alert.alert적용
                      (child_name)+"가 추가되었습니다.",
                      (room)+"반",
                      [
                        {
                          text:"확인",onPress:()=>{onRefresh(),console.log(response.data.message,response.status)}
                        }
                      ]
                    )
                  // },200)
                }).catch(function (error){
                  console.log(error.response.data.message,error.response.status);
                  })}
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
      {/* <ScrollView> */}
      
        {/* <View style={styles.body}>         */}
        {refreshing ? <ActivityIndicator /> : null}
        
        <FlatList
        data={child_name_list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}/>}
              
              />
        
        {/* </View> */}
        {/* </ScrollView> */}
        
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