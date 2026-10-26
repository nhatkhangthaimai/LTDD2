import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { EventContext } from '../context/EventContext';

export const OrganizerCard = ({ organizer, onPress, onMessagePress }) => {
  const { isOrganizerFollowed, toggleFollowOrganizer } = useContext(EventContext);
  const followed = isOrganizerFollowed(organizer.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: organizer.avatar }} style={styles.avatar} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{organizer.name}</Text>
        <Text style={styles.followers}>{organizer.followers} Followers</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.followBtn, followed && styles.followedBtn]}
          onPress={() => toggleFollowOrganizer(organizer.id)}
        >
          <Ionicons
            name={followed ? 'checkmark' : 'person-add-outline'}
            size={16}
            color={followed ? COLORS.textSecondary : COLORS.white}
          />
          <Text style={[styles.followText, followed && styles.followedText]}>
            {followed ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>

        {onMessagePress && (
          <TouchableOpacity style={styles.msgBtn} onPress={onMessagePress}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  followers: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  followedBtn: {
    backgroundColor: '#F0F1F5',
  },
  followText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  followedText: {
    color: COLORS.textSecondary,
  },
  msgBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
