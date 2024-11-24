import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { supabase } from "../../supabase"; // Import Supabase client
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider"; // Import global context

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setIsLogged, setUser } = useGlobalContext(); // Access setIsLogged and setUser

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      // Sign in user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;

      // Fetch the user's role from the 'users' table
      const { data: userData, error: roleError } = await supabase
        .from("users")
        .select("id, username, email, role")
        .eq("email", form.email)
        .single();

      if (roleError) throw roleError;

      // Update global context with user info and role
      setIsLogged(true);
      setUser(userData); // Store the user's details and role in the context

      Alert.alert("Success", `Welcome back, ${userData.role}!`);

      // Navigate based on role
      if (userData.role === "admin") {
        router.replace("/home"); // Redirect to admin dashboard
      } else if (userData.role === "seller") {
        router.replace("/home"); // Redirect to seller dashboard
      } else {
        throw new Error("Invalid role assigned to this user.");
      }
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
            Log in to Tori
          </Text>

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
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
