import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CustomHeader } from '../../components/CustomHeader';
import { AuthContext } from '../../context/AuthContext';

export const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('abc@email.com');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: New Password
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useContext(AuthContext);

  const handleSend = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (step === 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Verification Sent',
          `Demo OTP sent to ${email}. Proceeding to set new password.`,
          [{ text: 'OK', onPress: () => setStep(2) }]
        );
      }, 600);
    } else {
      if (!newPassword || newPassword.length < 6) {
        Alert.alert('Validation Error', 'New password must be at least 6 characters.');
        return;
      }
      try {
        setLoading(true);
        await resetPassword(email, newPassword);
        Alert.alert('Success', 'Your password has been reset successfully!', [
          { text: 'Back to Sign In', onPress: () => navigation.navigate('SignIn') },
        ]);
      } catch (e) {
        Alert.alert('Error', e.message || 'Failed to reset password.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader showBack onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Resset Password</Text>
          <Text style={styles.subtitle}>
            {step === 1
              ? 'Please enter your email address to request a password reset'
              : 'Enter your new password below'}
          </Text>

          {step === 1 ? (
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="abc@email.com"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor={COLORS.textMuted}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </View>
          )}

          <PrimaryButton
            title={step === 1 ? 'SEND' : 'UPDATE PASSWORD'}
            onPress={handleSend}
            loading={loading}
            style={styles.sendBtn}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    alignSelf: 'flex-start',
    lineHeight: 20,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 24,
    width: '100%',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  sendBtn: {
    width: '100%',
  },
});
