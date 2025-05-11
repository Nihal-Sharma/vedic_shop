import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import EcommRecomended from '@/components/HomeComponent/EcommRecomended'
import EcommCard from '@/components/HomeComponent/EcommCard'
import EcomNavBar from '@/components/HomeComponent/EcomNavBar'
import EcommFirstCategory from '@/components/HomeComponent/EcommFirstCategory'
import EcommBanner from '@/components/HomeComponent/EcommBanner'
import EcommBestSeller from '@/components/HomeComponent/EcommBestSeller'
import EcommSilver from '@/components/HomeComponent/EcommSilver'
import EcommSecondCategory from '@/components/HomeComponent/EcommSecondCategory'
import EcommBrass from '@/components/HomeComponent/EcommBrass'
import EcommCombo from '@/components/HomeComponent/EcommCombo'
import EcommGrid from '@/components/HomeComponent/EcommGrid'
import EcommSacred from '@/components/HomeComponent/EcommSacred'
import EcommBanner2 from '@/components/HomeComponent/EcommBanner2'
import EcommOccasion from '@/components/HomeComponent/EcommOcassion'
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const HomeScreen = () => {
  return (
    <ScrollView>
      <View>
        <EcomNavBar />
        <EcommFirstCategory />
        <EcommBanner />
        <EcommBestSeller />
        <EcommSilver />
        <EcommSecondCategory/>
        <EcommBrass />
        <EcommCombo />
        <EcommGrid/>
        <EcommSacred/>
        <EcommBanner2/>
        <EcommOccasion/>
        {/* <Text>index</Text> */}
        {/* <EcommRecomended/> */}
        {/* <EcommCard/> */}
      </View>
    </ScrollView>
  );
}

export default HomeScreen