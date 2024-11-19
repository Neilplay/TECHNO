import React from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const DashboardCard = ({ title, value, change, isUp, icon }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={[styles.cardChange, isUp ? styles.up : styles.down]}>
        {isUp ? "▲" : "▼"} {change}
      </Text>
    </View>
  </View>
);

const Home = () => {
  const data = [
    {
      id: "1",
      title: "Total Active Vendors",
      value: "5",
      change: "1% Up from yesterday",
      isUp: true,
      icon: <Ionicons name="person-circle" size={32} color="#fff" />,
    },
    {
      id: "2",
      title: "Total Orders",
      value: "21",
      change: "1.3% Up from past week",
      isUp: true,
      icon: <MaterialIcons name="inventory" size={32} color="#fff" />,
    },
    {
      id: "3",
      title: "Total Sales",
      value: "₱2,100",
      change: "1% Down from yesterday",
      isUp: false,
      icon: <FontAwesome5 name="chart-line" size={32} color="#fff" />,
    },
    {
      id: "4",
      title: "Total Pending",
      value: "3",
      change: "1% Up from yesterday",
      isUp: true,
      icon: <Ionicons name="time" size={32} color="#fff" />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DashboardCard
            title={item.title}
            value={item.value}
            change={item.change}
            isUp={item.isUp}
            icon={item.icon}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    marginTop:30,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3d3d3d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardChange: {
    fontSize: 12,
  },
  up: {
    color: "#4caf50",
  },
  down: {
    color: "#f44336",
  },
  chartContainer: {
    marginTop: 16,
  },
  chartTitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  chart: {
    height: 150,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },
});

export default Home;
