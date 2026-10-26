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
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AuthContext } from '../../context/AuthContext';

export const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('abc@email.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password, rememberMe);
      navigation.replace('MainDrawer');
    } catch (e) {
      Alert.alert('Sign In Failed', e.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert(
      `${provider} Sign In`,
      `This is a demo feature. Real ${provider} OAuth configuration is required for production authentication. Logging in with demo account instead.`,
      [
        {
          text: 'Proceed as Demo',
          onPress: async () => {
            await login('demo.user@email.com', '123456', true);
            navigation.replace('MainDrawer');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoE}>e</Text>
            </View>
            <View style={styles.brandRow}>
              <Text style={styles.brandEvent}>Event</Text>
              <Text style={styles.brandHub}>Hub</Text>
            </View>
          </View>

          <Text style={styles.title}>Sign in</Text>

          {/* Form */}
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

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Your password"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          </View>

          {/* Options Row */}
          <View style={styles.optionsRow}>
            <View style={styles.rememberRow}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#D0D0D0', true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
              <Text style={styles.rememberText}>Remember Me</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <PrimaryButton
            title="SIGN IN"
            onPress={handleSignIn}
            loading={loading}
            style={styles.signInBtn}
          />

          {/* OR Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => handleSocialLogin('Google')}
            activeOpacity={0.8}
          >
            <FontAwesome name="google" size={20} color="#EA4335" style={styles.socialIcon} />
            <Text style={styles.socialBtnText}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => handleSocialLogin('Facebook')}
            activeOpacity={0.8}
          >
            <FontAwesome name="facebook" size={20} color="#1877F2" style={styles.socialIcon} />
            <Text style={styles.socialBtnText}>Login with Facebook</Text>
          </TouchableOpacity>

          {/* Sign Up Redirect */}
          <View style={styles.bottomRedirectRow}>
            <Text style={styles.redirectLabel}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.redirectLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  logoE: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.white,
    marginTop: -4,
  },
  brandRow: {
    flexDirection: 'row',
  },
  brandEvent: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  brandHub: {
    fontSize: 28,
    fontWeight: '400',
    color: '#00F0FF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    alignSelf: 'flex-start',
    marginBottom: 20,
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
    marginBottom: 16,
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
  eyeBtn: {
    padding: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 8,
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  signInBtn: {
    width: '100%',
    marginBottom: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 54,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 14,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialBtnText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  bottomRedirectRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  redirectLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  redirectLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
