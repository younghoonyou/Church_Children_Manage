import React from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import WeeklyCalendar from 'react-native-weekly-calendar';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View} 
  from 'react-native';
  const sampleEvents = [
    { 'start': '2021-07-25 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
    { 'start': '2021-08-01 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
    { 'start': '2021-08-08 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
    { 'start': '2021-08-15 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
    { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
    { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
    { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
    { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
    { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
    { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
  ]

class ChatScreen extends React.Component {
  
  render() {
    return (
      <SafeAreaView style={styles.top}>
        <View style={styles.array}>
        <TouchableOpacity onPress={() => {}}>
            <Iconicons name={'trash-outline'} size={40}  color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.word}>스티커</Text>
        <TouchableOpacity onPress={() => {}}>
            <Iconicons name={'add-circle-outline'} size={40}  color={'white'}/>
            </TouchableOpacity>
            </View>
      {/* <ScrollView style={styles.container}> */}
        <View style={styles.body}>
        <WeeklyCalendar events={sampleEvents} style={{ height: 655 }} />
        </View>
        {/* </ScrollView> */}
        </SafeAreaView>
    );
  }
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
    // alignItems:'center',
    backgroundColor: '#aed0d2',
    flex: 1,
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
});

export default ChatScreen;