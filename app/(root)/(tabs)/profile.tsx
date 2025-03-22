import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

const SettingItems = ({ icon, title, onPress, textStyle, showArrow = true }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center py-2 justify-between"
  >
    <View className="flex flex-row items-center gap-2">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5 mt-1" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogOut = async () => {
    setModalVisible(false); 
    const result = await logout();

    if (result) {
      
      refetch();
    } else {
      Alert.alert("Error", "Error in logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <TouchableOpacity>
            <Image source={icons.bell} className="size-7 mt-1" />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center mt-5">
            <View className="relative">
              <Image source={{ uri: user?.avatar }} className="size-40 rounded-full" />
              <TouchableOpacity className="absolute bottom-1 right-1 bg-white p-1 rounded-full">
                <Image source={icons.edit} className="size-6" />
              </TouchableOpacity>
            </View>
            <Text className="mt-2 text-2xl font-rubik-bold">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingItems icon={icons.calendar} title="My Bookings" />
          <SettingItems icon={icons.wallet} title="Payments" />

          <View className="pt-5 mt-5 flex flex-col border-t border-primary-200">
            <SettingItems icon={icons.person} title="Profile" />
            <SettingItems icon={icons.shield} title="Security" />
            <SettingItems icon={icons.bell} title="Notification" />
            <SettingItems icon={icons.language} title="Language" />
            <SettingItems icon={icons.person} title="Help Center" />
            <SettingItems icon={icons.people} title="Invite Friends" />
          </View>
        </View>

        <View className="pt-5 mt-5 flex flex-col border-t border-primary-200 ">
          <SettingItems
            icon={icons.logout}
            title="Log-out"
            textStyle="text-danger"
            showArrow={false}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>

      <Modal transparent={true} visible={modalVisible}>
        <View className="flex-1 items-center justify-center bg-black/30 w-100 h-100 w-full">
          <View className="bg-white p-5 rounded-xl w-80">
            <Text className="text-xl font-rubik-bold text-center">Confirm Logout</Text>
            <Text className="text-sm text-black-300 text-center mt-2">
              Are you sure you want to log out?
            </Text>

            <View className="flex flex-row justify-around mt-5">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="px-5 py-2 rounded-lg bg-gray-300"
              >
                <Text className="text-lg font-rubik-bold text-black">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogOut}
                className="px-5 py-2 rounded-lg bg-red-500"
              >
                <Text className="text-lg font-rubik-bold text-white">Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
