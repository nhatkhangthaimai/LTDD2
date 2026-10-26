import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { AuthContext } from '../../context/AuthContext';

export const MyProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [readMore, setReadMore] = useState(false);

  const currentUser = user || {
    fullName: 'Ashfak Sayem',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    following: 350,
    followers: 346,
    about: 'Enjoy your favorite dishes and a lovely time with friends and family. Food from local food trucks will be available for purchase.',
    interests: ['Games Online', 'Concert', 'Music', 'Art', 'Movie', 'Others'],
  };

  const tagColors = ['#5566FF', '#FF5656', '#F59E0B', '#29D697', '#9B51E0', '#46CDFB'];

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Profile"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{currentUser.fullName}</Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{currentUser.following || 350}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{currentUser.followers || 346}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={18} color={COLORS.primary} style={styles.editIcon} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* About Me Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText} numberOfLines={readMore ? undefined : 3}>
            {currentUser.about}
          </Text>
          <TouchableOpacity onPress={() => setReadMore(!readMore)}>
            <Text style={styles.readMoreText}>{readMore ? 'Show Less' : 'Read More...'}</Text>
          </TouchableOpacity>
        </View>

        {/* Interest Section */}
        <View style={styles.section}>
          <View style={styles.interestHeader}>
            <Text style={styles.sectionTitle}>Interest</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.changeText}>CHANGE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagsContainer}>
            {(currentUser.interests || ['Games Online', 'Concert', 'Music', 'Art']).map((tag, idx) => (
              <View
                key={idx}
                style={[styles.tagPill, { backgroundColor: tagColors[idx % tagColors.length] }]}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 14,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#EAEAEA',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
  },
  editIcon: {
    marginRight: 6,
  },
  editText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 6,
  },
  interestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
