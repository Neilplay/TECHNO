import React from 'react';
import { View, Text, StyleSheet, FlatList, Picker, Image } from 'react-native';

export default function MembersList({ members, onUpdateRole }) {
  const renderMember = ({ item }) => (
    <View style={styles.memberContainer}>
      {/* Left Section: User Icon */}
      <View style={styles.userDetails}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.memberName}>{item.name}</Text>
          <Text style={styles.memberUsername}>{item.username}</Text>
        </View>
      </View>

      {/* Right Section: Role Dropdown */}
      <Picker
        selectedValue={item.role}
        style={styles.picker}
        onValueChange={(newRole) => onUpdateRole(item.id, newRole)}
      >
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Co-admin" value="Co-admin" />
        <Picker.Item label="Seller" value="Seller" />
      </Picker>
    </View>
  );

  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMember}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginVertical: 16,
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#ccc', // Fallback color if the image fails to load
  },
  memberName: {
    fontWeight: 'bold',
  },
  memberUsername: {
    color: '#666',
  },
  picker: {
    width: 120,
    height: 40,
  },
});
