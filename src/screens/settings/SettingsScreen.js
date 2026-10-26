import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { AuthContext } from '../../context/AuthContext';

export const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.replace('SignIn');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Settings" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>Preferences</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingLabelGroup}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D0D0D0', true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLabelGroup}>
            <Ionicons name="moon-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.settingText}>Dark Mode (Placeholder)</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#D0D0D0', true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLabelGroup}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.settingText}>Location Services</Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: '#D0D0D0', true: COLORS.primary }}
          />
        </View>

        <Text style={styles.sectionHeader}>Support & Account</Text>

        <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('ContactUs')}>
          <View style={styles.settingLabelGroup}>
            <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.settingText}>Contact Us</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('HelpFaq')}>
          <View style={styles.settingLabelGroup}>
            <Ionicons name="help-circle-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.settingText}>Help & FAQs</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} style={styles.icon} />
          <Text style={styles.logoutText}>Sign Out</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F5',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F5',
  },
  settingLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.error,
  },
});
