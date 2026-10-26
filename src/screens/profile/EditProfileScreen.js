import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AuthContext } from '../../context/AuthContext';

export const EditProfileScreen = ({ navigation }) => {
  const { user, updateProfile } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user?.fullName || 'Ashfak Sayem');
  const [about, setAbout] = useState(user?.about || '');
  const [phone, setPhone] = useState(user?.phone || '+1 202 555 0147');
  const [location, setLocation] = useState(user?.location || 'New York, USA');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Full Name cannot be empty.');
      return;
    }
    try {
      setLoading(true);
      await updateProfile({
        fullName: fullName.trim(),
        about: about.trim(),
        phone: phone.trim(),
        location: location.trim(),
      });
      Alert.alert('Profile Updated', 'Your profile details have been saved!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Edit Profile" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar Container */}
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                user?.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
            }}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.cameraCircle}
            onPress={() => Alert.alert('Change Avatar', 'Select photo from gallery in demo.')}
          >
            <Ionicons name="camera" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <Text style={styles.inputLabel}>Full Name</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
          />
        </View>

        <Text style={styles.inputLabel}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.inputLabel}>Location</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
        </View>

        <Text style={styles.inputLabel}>About Me</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={about}
            onChangeText={setAbout}
            placeholder="Write a brief bio..."
            multiline
            numberOfLines={4}
          />
        </View>

        <PrimaryButton
          title="SAVE CHANGES"
          onPress={handleSave}
          loading={loading}
          style={styles.saveBtn}
        />
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
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraCircle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    height: 52,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  textAreaContainer: {
    height: 110,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  saveBtn: {
    marginTop: 10,
  },
});
