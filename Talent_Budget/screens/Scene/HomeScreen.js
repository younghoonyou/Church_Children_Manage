import React ,{useState,useEffect} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  LogBox,
  } 
  from 'react-native';
  LogBox.ignoreLogs([
    'componentWillMount',
    'componentWillUpdate',
    'componentWillReceiveProps'
  ])
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
  const Item = ({ title,room_name,data }) => {
    return(
      <Collapse>
      <CollapseHeader>
      <View style={Room_color('#deeced')}>
        {/* <Text style={styles.title}>{title}   {age} Ages</Text> */}
        <Text style={styles.room_name}>Title : {title}</Text>
        <Text style={styles.room_name}>Writer : {room_name}</Text>
      </View>
      {/* </TouchableOpacity> */}
      </CollapseHeader>
      <CollapseBody>
      <View style={Room_color('#deeced')}>
      <Text style={styles.date}>{data.substr(0,4) + '/' + data.substr(5,2) + '/' + data.substr(8,2)}</Text>
      </View>
    </CollapseBody>
      </Collapse>
    )};

    // <Collapse>
    //   <CollapseHeader>
    //   <View style={Room_auto('#deeced')}>
    //     {/* <Text style={styles.title}>{title}   {age} Ages</Text> */}
    //     <Text style={styles.room_name}>{room_name}</Text>
    //   </View>
    //   {/* </TouchableOpacity> */}
    //   </CollapseHeader>
    //   <CollapseBody>
    //   <View style={accordion(room_name)}>
    //   <Text style={styles.date}>{data.substr(0,4) + '/' + data.substr(5,2) + '/' + data.substr(8,2)}</Text>
    //   </View>
    // </CollapseBody>
    //   </Collapse>



    // <View style={Room_color('#deeced')}>
      {/* <Text style={styles.title}>Title : {title}</Text>
      <Text style={styles.room_name}>Writer : {room_name}</Text> */}
    //   <Text style={styles.date}>{data.substr(0,4) + '/' + data.substr(5,2) + '/' + data.substr(8,2)}</Text>
    // </View>
  // );

    const HomeScreen = ({navigation,route}) => {
      const [refreshing, setRefreshing] = useState(false);
      const [board_list, setboard_list] = useState([]);
      const user = route.params.Token
      const onRefresh = () => {
        //Clear old data of the list
        setboard_list([]);
        //Call the Service to get the latest data
        getUsers().then(
          (response)=>{
            setboard_list(response.data.listup);
          }
        ).catch(console.log);
      };
     
      
      const getUsers = async () => {
        const response = await axios.get('http://52.79.201.37:8000/board/add-board/');
        console.log(response.data);
        if(response.status == 200){
          const jsonValue = await response;
          return Promise.resolve(jsonValue);
        }
        else{
          return Promise.reject('File dose not exist');
        }
        // console.log(response.data.childs);
        // setboard_list(response.data.listup);
      };
      const renderItem = ({ item }) => (
      <TouchableOpacity onPress={()=>{}}>
        <Item title={item.title} room_name={item.writer_name} data={item.created_at}/>
        </TouchableOpacity>
      );
    
    useEffect(()=>{
      onRefresh();
      // getUsers().then(
      //   function(response){
      //     setboard_list(response.data.listup);
      //   }
      // ).catch(console.log);
      // console.log(board_list)
    },[])
    return (
      
      <SafeAreaView style={styles.top}>
        <View style={styles.array}>
        <TouchableOpacity onPress={() => {console.log(user)}}>
            <Iconicons name={'trash-outline'} size={40}  color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.word}>History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('historyScreen',{Token:user})}>
            <Iconicons name={'add-circle-outline'} size={40}  color={'white'}/>
          </TouchableOpacity>
            </View>
      <View style={styles.container}>
        {/* <View style={styles.body}> */}
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
        data={board_list}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        refreshControl={
          <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
        }/>
        </View>
        {/* </View> */}
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
  date:{
    fontSize: 20,
  }
});

export default HomeScreen;