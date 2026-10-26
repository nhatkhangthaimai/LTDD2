import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
import { AuthContext } from '../../context/AuthContext';

export const SplashScreen = ({ navigation }) => {
  const { user, hasSeenOnboarding, loading } = useContext(AuthContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          navigation.replace('MainDrawer');
        } else if (!hasSeenOnboarding) {
          navigation.replace('Onboarding');
        } else {
          navigation.replace('SignIn');
        }
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [loading, user, hasSeenOnboarding]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.logoE}>e</Text>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.brandTitle}>Event</Text>
          <Text style={styles.brandSubtitle}>Hub</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  logoE: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    marginTop: -4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 34,
    fontWeight: '400',
    color: '#00F0FF',
    letterSpacing: -0.5,
  },
});
