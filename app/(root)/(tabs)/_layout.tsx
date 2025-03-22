import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View, TouchableOpacity } from "react-native";
import icons from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: ImageSourcePropType; title: string }) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image source={icon} tintColor={focused ? "#FF6A00" : "#666876"} resizeMode="contain" className="size-6" />
    <Text className={`${focused ? "text-orange-500 font-bold" : "text-gray-500 font-normal"} text-xs w-full text-center mt-1`}>
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
          tabBarButton: (props) => <TouchableOpacity {...props} activeOpacity={0.8} />, 
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Explore" />,
          tabBarButton: (props) => <TouchableOpacity {...props} activeOpacity={0.8} />, 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
          tabBarButton: (props) => <TouchableOpacity {...props} activeOpacity={0.8} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
