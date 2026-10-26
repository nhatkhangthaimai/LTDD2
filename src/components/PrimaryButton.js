import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export const PrimaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  icon,
  showArrow = true,
  loading = false,
  disabled = false,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
}) => {
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary && styles.buttonSecondary,
        isOutline && styles.buttonOutline,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? COLORS.primary : COLORS.white} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.text,
              isSecondary && styles.textSecondary,
              isOutline && styles.textOutline,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {showArrow && (
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={16} color={isOutline ? COLORS.primary : COLORS.white} />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonSecondary: {
    backgroundColor: COLORS.primaryLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  textSecondary: {
    color: COLORS.primary,
  },
  textOutline: {
    color: COLORS.primary,
  },
  arrowCircle: {
    position: 'absolute',
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
