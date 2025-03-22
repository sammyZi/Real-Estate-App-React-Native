import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView
      className="bg-white h-full"
      style={{
        paddingTop:
          Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 10 : 0,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} className="w-full h-3/6" />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200 mt-5">
            Welcome to restate
          </Text>

          <Text className="text-3xl text-center font-rubik-bold text-black-300 mt-3">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your New Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-center text-black-200 mt-10">
            Login With Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-gray-100 shadow-md shadow-zinc-200 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue With Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
