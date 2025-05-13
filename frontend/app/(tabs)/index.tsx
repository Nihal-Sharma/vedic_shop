import { View, Text,ScrollView, FlatList } from 'react-native'
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
  const sections = [ "EcommFirstCategory" , "EcommBanner" , "EcommBestSeller", "EcommSilver", "EcommSecondCategory", "EcommBrass", "EcommCombo", "EcommGrid", "EcommSacred", "EcommBanner2" , "EcommOccasion"];
  return (
     <>
      <EcomNavBar />
    <FlatList
       data={sections} // an array like ['firstCategory', 'banner', 'bestSeller', ...]
         keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
           switch (item) {
                case 'EcommFirstCategory':
                      return <EcommFirstCategory />;
                 case 'EcommBanner':
                      return <EcommBanner />;
                 case 'EcommBestSeller':
                      return <EcommBestSeller />;
                 case 'EcommSilver':
                      return <EcommSilver />;
                 case 'EcommSecondCategory':
                      return <EcommSecondCategory />;
                 case 'EcommBrass':
                      return <EcommBrass />;
                 case 'EcommCombo':
                      return <EcommCombo />;
                 case 'EcommGrid':
                      return <EcommGrid />;
                 case 'EcommBanner2':
                      return <EcommSacred />;
                 case 'bestSeller':
                      return <EcommBanner2 />;
                 case 'EcommOccasion':
                      return <EcommOccasion />;
      // ... other cases
      default:
        return null;
    }
  }}
      initialNumToRender={4}
      maxToRenderPerBatch={1}
      windowSize={4}
/></>
  );
}

export default HomeScreen