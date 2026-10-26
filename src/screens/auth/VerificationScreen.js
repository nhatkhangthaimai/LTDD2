import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CustomHeader } from '../../components/CustomHeader';
import { AuthContext } from '../../context/AuthContext';

export const VerificationScreen = ({ route, navigation }) => {
  const { email = 'abc@email.com', password = '123456' } = route.params || {};
  const [otp, setOtp] = useState(['4', '4', '', '']);
  const [timer, setTimer] = useState(50);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const { verifyOTP, login } = useContext(AuthContext);

  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const inputs = [inputRef0, inputRef1, inputRef2, inputRef3];

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 4) {
      Alert.alert('Validation Error', 'Please enter the 4-digit OTP code.');
      return;
    }

    try {
      setLoading(true);
      await verifyOTP(code);
      Alert.alert('Success', 'Verification successful! Logging in...', [
        {
          text: 'OK',
          onPress: async () => {
            await login(email, password, true);
            navigation.replace('MainDrawer');
          },
        },
      ]);
    } catch (e) {
      Alert.alert('Verification Failed', e.message || 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setOtp(['4', '4', '', '']);
    setTimer(50);
    setCanResend(false);
    Alert.alert('OTP Resent', 'A new 4-digit code has been sent.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader showBack onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          We've sent you the verification code on {email || '+1 2620 0323 7631'}
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputs[index]}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Continue Button */}
        <PrimaryButton
          title="CONTINUE"
          onPress={handleVerify}
          loading={loading}
          style={styles.continueBtn}
        />

        {/* Resend Timer */}
        <View style={styles.resendRow}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Re-send code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              Re-send code in <Text style={styles.timerHighlight}>0:{timer < 10 ? `0${timer}` : timer}</Text>
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E4DFDF',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  otpBoxFilled: {
    borderColor: COLORS.primary,
    backgroundColor: '#F8F9FE',
  },
  continueBtn: {
    width: '100%',
    marginBottom: 24,
  },
  resendRow: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  timerHighlight: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  resendLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
