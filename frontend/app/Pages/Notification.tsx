import { View, Text,StyleSheet, TouchableOpacity,  StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
const ArrowLeft = () => (
  <Text style={styles.arrowLeft}>←</Text>
);

const NotificationItem = ({ initial, title, dateRange, timestamp }) => {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDateRange}>{dateRange}</Text>
      </View>
      
      <Text style={styles.notificationTimestamp}>{timestamp}</Text>
    </View>
  );
};

const Notification = () => {

   const goBack = () => {
    // Navigate back
    // If using React Navigation: navigation.goBack();
    console.log('Going back');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style ={{  display :'flex' , justifyContent :'center' , alignItems :'center'}}><Text style={styles.headerTitle}>Notification</Text></View>
      </View>
       
      
      {/* Notification List */}
      <View style={styles.notificationList}>
        <NotificationItem 
          initial="S"
          title="SUMMER SALE IS LIVE"
          dateRange="9 May -12 May 2025"
          timestamp="02/02/2025 6:30 AM"
        />
        
        {/* You can add more notification items here */}
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent:'flex-start',
  },
  backButton: {
    marginRight :5
  },
  
  arrowLeft: {
    fontSize: 22,
    color: '#000',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6979F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationDateRange: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#9e9e9e',
    alignSelf: 'flex-start',
  },
});
export default Notification