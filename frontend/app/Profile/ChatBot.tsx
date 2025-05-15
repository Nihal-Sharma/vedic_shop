import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const ChatBot = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor :"red" , flex :1 }}>
      <Text>HEllo</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ChatBot