import { View, Text } from 'react-native'
import React from 'react'
import EcommRecomended from '@/components/HomeComponent/EcommRecomended'
import EcommCard from '@/components/HomeComponent/EcommCard'

const HomeScreen = () => {
  return (
    <View>
      {/* <Text>index</Text> */}
      <EcommRecomended/>
      {/* <EcommCard/> */}
    </View>
  )
}

export default HomeScreen