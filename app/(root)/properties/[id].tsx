import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Property = () => {

    const {id}=useLocalSearchParams();
    
  return (
    <View className='h-full bg-white'>
      <Text>Property </Text>
    </View>
  )
}

export default Property;