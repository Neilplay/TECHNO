import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Make sure this is your Supabase client import

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
      <Text
        style={[
          styles.iconLabel,
          focused ? styles.iconLabelFocused : styles.iconLabelDefault,
          { color },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged, user } = useGlobalContext();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!loading && isLogged) {
      fetchUserRole();
    }
  }, [loading, isLogged]);

  const fetchUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
      } else {
        setRole(data.role);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        {role === "admin" && (
          <Tabs.Screen
            key="inventory_user"
            name="inventory_user"
            options={{
              title: "Inventory",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  name="Inventory"
                  focused={focused}
                />
              ),
            }}
          />
        )}
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading || role === null} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#161622",
    borderTopWidth: 1,
    borderTopColor: "#232533",
    height: 70,
    paddingBottom: 10,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconLabel: {
    fontSize: 10,
  },
  iconLabelDefault: {
    fontFamily: "System",
    fontWeight: "400",
  },
  iconLabelFocused: {
    fontFamily: "System",
    fontWeight: "600",
  },
});

export default TabLayout;
