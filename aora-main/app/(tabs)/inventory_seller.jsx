import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import TabsContainer from "../user_tabs/TabContainer";

const Inventory = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.inventory}>
      <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  inventory: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
});
