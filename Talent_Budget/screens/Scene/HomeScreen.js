import React ,{useState,useEffect} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
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
  } 
  from 'react-native';
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
  const Item = ({ title,room_name,date }) => (
    
    <View style={Room_color('#deeced')}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.room_name}>{room_name}</Text>
      {/* <Text style={styles.date}>{date}</Text> */}
    </View>
  );

    const HomeScreen = ({navigation,route}) => {
      const [refreshing, setRefreshing] = useState(false);
      const [board_list, setboard_list] = useState([]);
      const user = route.params.Token
      const onRefresh = () => {
        //Clear old data of the list
        setboard_list([]);
        //Call the Service to get the latest data
        getUsers();
      };
     
      
      const getUsers = async () => {
        const response = await axios.get('http://127.0.0.1:8000/board/add-board/')
        // console.log(response.data.childs);
        setboard_list(response.data.listup);
      };
      const renderItem = ({ item }) => (
      <TouchableOpacity onPress={()=>{}}>
        <Item title={item.title} room_name={item.writer} data={item.created_at}/>
        </TouchableOpacity>
      );
    
    useEffect(()=>{
      getUsers();
      console.log(board_list)
    },[])
    return (
      
      <SafeAreaView style={styles.top}>
        <View style={styles.array}>
        <TouchableOpacity onPress={() => {}}>
            <Iconicons name={'trash-outline'} size={40}  color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.word}>상품</Text>
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