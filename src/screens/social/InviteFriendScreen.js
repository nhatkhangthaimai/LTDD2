import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { SearchBar } from '../../components/SearchBar';
import { PrimaryButton } from '../../components/PrimaryButton';
import { userService } from '../../services/userService';
import { EventContext } from '../../context/EventContext';

export const InviteFriendScreen = ({ route, navigation }) => {
  const { eventTitle = 'Event' } = route.params || {};
  const [friends, setFriends] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const { inviteFriends } = useContext(EventContext);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      setLoading(true);
      const data = await userService.getFriends();
      setFriends(data);
    } catch (e) {
      console.error('Error loading friends:', e);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleSendInvite = async () => {
    if (selectedIds.length === 0) {
      Alert.alert('Selection Error', 'Please select at least one friend to invite.');
      return;
    }

    const selectedFriends = friends.filter(f => selectedIds.includes(f.id));
    const names = selectedFriends.map(f => f.name);

    await inviteFriends(names, eventTitle);

    Alert.alert(
      'Invitations Sent!',
      `Successfully sent invitations for "${eventTitle}" to ${selectedIds.length} friends!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Invite Friend" showBack onBackPress={() => navigation.goBack()} />

      <View style={styles.searchPadding}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
          showFilterButton={false}
        />
      </View>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.friendCard}
              onPress={() => toggleSelect(item.id)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />

              <View style={styles.infoBox}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.followersText}>{item.followers}</Text>
              </View>

              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Ionicons name="checkmark" size={16} color={COLORS.white} />}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.bottomBar}>
        <PrimaryButton
          title={`INVITE (${selectedIds.length})`}
          onPress={handleSendInvite}
          style={styles.inviteBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchPadding: {
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F5',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  infoBox: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  followersText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E4DFDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F5',
  },
  inviteBtn: {
    width: '100%',
  },
});
