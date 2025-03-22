import React, { useState, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || "All");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);
  
  const scrollViewRef = useRef<ScrollView>(null); 

  const handleCategoryPress = (category: string) => {
    if (isScrolling) return; 

    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newScrollX = event.nativeEvent.contentOffset.x;
    setScrollX(newScrollX);

  
    if (newScrollX > 5 && newScrollX < maxScrollX - 5) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }

    if (newScrollX < 0) {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false }); 
    }
  };

  const handleContentSizeChange = (contentWidth: number, viewWidth: number) => {
    setMaxScrollX(contentWidth - viewWidth);
  };

  return (
    <View className="mt-3 mb-2">
      <ScrollView
        ref={scrollViewRef} 
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        onMomentumScrollEnd={() => setIsScrolling(false)}
        bounces={false} 
        overScrollMode="never" 
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(item.category)}
            activeOpacity={0.7}
            disabled={isScrolling} 
            className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
              selectedCategory === item.category
                ? "bg-primary-300"
                : "bg-primary-100 border border-primary-200"
            }`}
          >
            <Text
              className={`text-sm ${
                selectedCategory === item.category
                  ? "text-white font-rubik-bold mt-0.5"
                  : "text-black-300 font-rubik"
              }`}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Filters;
