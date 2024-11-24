import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const user3 = () => {
  const [items, setItems] = useState([
    { name: 'Item 1', quantity: '5', image: 'https://via.placeholder.com/100' },
    { name: 'Item 2', quantity: '3', image: 'https://via.placeholder.com/100' },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <Text style={styles.header}>Inventory</Text>

      {/* Grid Layout */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Ensures 3 items per row
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items yet</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  itemBox: {
    flex: 1,
    margin: 5,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    maxWidth: '30%',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
    borderRadius: 8,
  },
  itemText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemQuantity: {
    color: '#ccc',
    fontSize: 12,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default user3;
