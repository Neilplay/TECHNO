import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';

const user3 = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  const addItem = () => {
    if (!newItem.name || !newItem.quantity) {
      alert('Please provide both name and quantity');
      return;
    }
    const placeholderImage = 'https://via.placeholder.com/100'; // Placeholder image
    setItems([...items, { ...newItem, image: placeholderImage }]);
    setNewItem({ name: '', quantity: '' });
    setShowModal(false);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setShowItemModal(false);
  };

  const updateItem = () => {
    if (!selectedItem.name || !selectedItem.quantity) {
      alert('Please provide both name and quantity');
      return;
    }
    const updatedItems = items.map((item, index) =>
      index === selectedItem.index ? selectedItem : item
    );
    setItems(updatedItems);
    setSelectedItem(null);
    setShowItemModal(false);
  };

  const openItemModal = (item, index) => {
    setSelectedItem({ ...item, index });
    setShowItemModal(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <Text style={styles.header}>Inventory</Text>

      {/* Grid Layout */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Ensures 3 items per row
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.itemBox}
            onPress={() => openItemModal(item, index)}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items yet</Text>}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Item Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              placeholderTextColor="#999"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={newItem.quantity}
              onChangeText={(text) => setNewItem({ ...newItem, quantity: text })}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addItem}>
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Item Options Modal */}
      <Modal visible={showItemModal} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update or Delete Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              placeholderTextColor="#999"
              value={selectedItem?.name}
              onChangeText={(text) =>
                setSelectedItem((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={selectedItem?.quantity}
              onChangeText={(text) =>
                setSelectedItem((prev) => ({ ...prev, quantity: text }))
              }
            />
            <TouchableOpacity style={styles.modalButton} onPress={updateItem}>
              <Text style={styles.modalButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={() => deleteItem(selectedItem.index)}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowItemModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 80, // Prevent items from overlapping the add button
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  cancelButton: {
    backgroundColor: '#555',
  },
});

export default user3;
