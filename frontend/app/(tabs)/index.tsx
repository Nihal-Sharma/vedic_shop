import { View, Text,ScrollView, FlatList, StatusBar } from 'react-native'
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
import EcommFestival from '@/components/HomeComponent/EcommFestivel'
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const HomeScreen = () => {
  const sections = [ "1" , "2" , "3", "4", "5", "6", "7", "8", "9", "10" , "11","12"];
  return (
     <>
     <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <EcomNavBar />
    <FlatList
       data={sections} // an array like ['firstCategory', 'banner', 'bestSeller', ...]
         keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
           switch (item) {
                case '1':
                      return <EcommFirstCategory />;
                 case '2':
                      return <EcommBanner />;
                 case '3':
                      return <EcommBestSeller />;
                 case '4':
                      return <EcommSilver />;
                 case '5':
                      return <EcommSecondCategory />;
                 case '6':
                      return <EcommSacred />;
                 case '7':
                      return <EcommOccasion />;
                 case '8':
                      return <EcommFestival />;
                 case '9':
                      return <EcommBrass />;
                 case '10':
                      return <EcommCombo />;
                 case '11':
                      return <EcommBanner2 />;
                 case '12':
                      return <EcommGrid />;
                 
                
               
      // ... other cases
      default:
        return null;
    }
  }}
   contentContainerStyle ={{backgroundColor :"white"}}
     initialNumToRender={3}
      maxToRenderPerBatch={1}
      windowSize={9}
/></>
  );
}

export default HomeScreen