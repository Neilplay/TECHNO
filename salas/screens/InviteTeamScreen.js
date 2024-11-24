import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MembersList from '../components/MembersList';

export default function InviteTeamScreen() {
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Ivi Salas (You)',
      username: '@salas.ivisusej',
      role: 'Admin',
      avatar: '/assets/5.png',
    },
    {
      id: 2,
      name: 'Avah Ayop',
      username: '@ayop.avah',
      role: 'Co-admin',
      avatar: '/assets/1.png',
    },
    {
      id: 3,
      name: 'Ian Olandria',
      username: '@olandria.ian',
      role: 'Seller',
      avatar: '/assets/2.png',
    },
    {
      id: 4,
      name: 'Neil Llagas',
      username: '@llagas.neil',
      role: 'Seller',
      avatar: '/assets/4.png',
    },
    {
      id: 5,
      name: 'John Villanueva',
      username: '@villanueva.john',
      role: 'Seller',
      avatar: '/assets/3.png',
    },
  ]);

  const handleAddMember = () => {
    if (email) {
      setMembers([
        ...members,
        {
          id: Date.now(),
          name: email,
          username: `@${email}`,
          role: 'Seller',
          avatar: 'https://via.placeholder.com/40',
        },
      ]);
      setEmail('');
    }
  };

  const handleUpdateRole = (id, newRole) => {
    const updatedMembers = members.map((member) =>
      member.id === id ? { ...member, role: newRole } : member
    );
    setMembers(updatedMembers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite team</Text>
      <Text style={styles.subtitle}>Add team members to collaborate and manage together.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="@example123"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddMember}>
          <Text style={styles.sendButtonText}>Send Invite</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.membersAddedText}>
        Members Added ({members.length})
      </Text>

      <MembersList members={members} onUpdateRole={handleUpdateRole} />

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Link to share</Text>
        <View style={styles.linkInputContainer}>
          <TextInput style={styles.linkInput} value="http://www.tori.com/team" editable={false} />
          <TouchableOpacity style={styles.copyButton} onPress={() => alert('Link copied!')}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  input: {
    color: '#505050',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  membersAddedText: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: 0,
    color: '#505050',
  },
  linkContainer: {
    marginVertical: 12,
  },
  linkText: {
    color: '#505050',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  linkInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkInput: {
    color: '#505050',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  continueButton: {
    marginTop: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  copyButton: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
  },
});
