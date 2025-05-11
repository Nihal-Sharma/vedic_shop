import { View, Text } from 'react-native'
import React from 'react'
import EcommRecomended from '@/components/HomeComponent/EcommRecomended'
import EcommCard from '@/components/HomeComponent/EcommCard'
import EcomNavBar from '@/components/HomeComponent/EcomNavBar'
import EcommFirstCategory from '@/components/HomeComponent/EcommFirstCategory'
import EcommBanner from '@/components/HomeComponent/EcommBanner'
import EcommBestSeller from '@/components/HomeComponent/EcommBestSeller'

const HomeScreen = () => {
  return (
    <View>
      <EcomNavBar/>
      <EcommFirstCategory/>
      <EcommBanner/>
      <EcommBestSeller/>
      {/* <Text>index</Text> */}
      {/* <EcommRecomended/> */}
      {/* <EcommCard/> */}

    </View>
  )
}

export default HomeScreen