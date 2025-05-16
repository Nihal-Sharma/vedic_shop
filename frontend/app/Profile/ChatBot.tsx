import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
const ChatBot = () => {
  return (
   <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      {/* Your main content here */}
      <View style={styles.content}>
        {/* Other content above the input box */}
        {/* Header */}
        
        <View style = {styles.header}>
              
        </View>
      </View>

      {/* Bottom typing box */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60} // adjust as needed
        style={styles.inputWrapper}
      >
        <View style = {styles.bottomBar}>
      <TextInput
          style={styles.input}
          placeholder="Type Message..."
          placeholderTextColor="#FF720B"
          cursorColor="#FF720B"
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <FontAwesome name="photo" size={24} color="#FF6E05" />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Feather name="camera" size={24} color="#FF6E05" />
        </TouchableOpacity></View>
        
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ChatBot
const styles = StyleSheet.create({
 container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor :'white'
    // Other content styling
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  
  },
  input: {
    paddingVertical :15,
    borderRadius: 20,
    fontSize :14,
    flex :1,
    fontWeight :400
  },
  bottomBar:{
    backgroundColor :'#FFEFE4',
    borderRadius : 50,
    display :'flex',
    flexDirection :'row',
    justifyContent :'space-between',
    paddingHorizontal :17
  },
  buttonContainer:{
    display :'flex',
    flexDirection :'row',
    justifyContent :'center',
    alignItems :'center',
    gap :12
  },
  header :{
    elevation :1
  }
})