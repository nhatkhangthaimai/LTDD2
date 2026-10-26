import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { PrimaryButton } from './PrimaryButton';

export const EmptyState = ({
  icon = 'calendar-outline',
  title = 'No Upcoming Event',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  buttonTitle = 'EXPLORE EVENTS',
  onButtonPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.illustrationCircle}>
        <View style={styles.iconWrapper}>
          <Ionicons name={icon} size={64} color={COLORS.primary} />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {onButtonPress && buttonTitle && (
        <PrimaryButton
          title={buttonTitle}
          onPress={onButtonPress}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: COLORS.background,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F0F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    maxWidth: 240,
  },
});
