import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Import the picker
import { supabase } from "../../supabase"; // Import Supabase client
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "seller", // Default role is "seller"
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      // Create a new user in Supabase Auth
      const { data: user, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      // Insert user details along with the role into the 'users' table
      const { error: dbError } = await supabase.from("users").insert([
        {
          username: form.username,
          email: form.email,
          role: form.role, // Store the role for the user
        },
      ]);

      if (dbError) throw dbError;

      Alert.alert("Success", "Account created successfully! Please log in.");
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.tori_logo4}
            resizeMode="contain"
            className="w-[150px] h-[80px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Tori
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />

          {/* Dropdown for Role Selection */}
          <View className="mt-7">
            <Text className="text-white font-pregular mb-2">Role</Text>
            <RNPickerSelect
              onValueChange={(value) => setForm({ ...form, role: value })}
              items={[
                { label: "Seller", value: "seller" },
                { label: "Admin", value: "admin" },
              ]}
              value={form.role}
              placeholder={{}} // Removes "Select an item" text
              style={{
                inputAndroid: {
                  // Tailwind equivalent: "bg-white rounded-md p-3 text-base"
                  backgroundColor: "#1E1E2D",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: "#FFFFFA",
                },
                inputIOS: {
                  // Tailwind equivalent: "bg-white rounded-md p-3 text-base"
                  backgroundColor: "#FFF",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: "#000",
                },
              }}
            />
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
