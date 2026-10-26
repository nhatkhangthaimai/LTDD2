import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { AuthContext } from '../context/AuthContext';

export const DrawerContent = (props) => {
  const { user, logout } = useContext(AuthContext);

  const currentUser = user || {
    fullName: 'Ashfak Sayem',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          props.navigation.replace('SignIn');
        },
      },
    ]);
  };

  const menuItems = [
    { label: 'My Profile', icon: 'person-outline', route: 'MyProfile' },
    { label: 'Message', icon: 'chatbubble-ellipses-outline', route: 'Messages' },
    { label: 'Calendar', icon: 'calendar-outline', route: 'Calendar' },
    { label: 'Bookmark', icon: 'bookmark-outline', route: 'Bookmark' },
    { label: 'Contact Us', icon: 'mail-outline', route: 'ContactUs' },
    { label: 'Settings', icon: 'settings-outline', route: 'Settings' },
    { label: 'Helps & FAQs', icon: 'help-circle-outline', route: 'HelpFaq' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Info Header */}
        <TouchableOpacity
          style={styles.profileHeader}
          onPress={() => props.navigation.navigate('MyProfile')}
        >
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{currentUser.fullName}</Text>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.menuItem}
              onPress={() => props.navigation.navigate(item.route)}
              activeOpacity={0.8}
            >
              <Ionicons name={item.icon} size={22} color={COLORS.textSecondary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {/* Sign Out */}
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Upgrade Pro Button Banner */}
        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={() => Alert.alert('Upgrade Pro', 'EventHub Pro Membership unlocked!')}
          activeOpacity={0.85}
        >
          <Ionicons name="flash" size={16} color="#00F0FF" style={styles.upgradeIcon} />
          <Text style={styles.upgradeText}>Upgrade Pro</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  profileHeader: {
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  menuList: {
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F0FF1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  upgradeIcon: {
    marginRight: 8,
  },
  upgradeText: {
    color: '#00F0FF',
    fontSize: 14,
    fontWeight: '700',
  },
});
