import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

export const CustomHeader = ({
  title,
  showBack = true,
  onBackPress,
  rightIcon,
  onRightPress,
  style,
  titleStyle,
  dark = false,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const iconColor = dark ? COLORS.white : COLORS.textPrimary;
  const textColor = dark ? COLORS.white : COLORS.textPrimary;

  return (
    <View style={[styles.headerContainer, style]}>
      {showBack ? (
        <TouchableOpacity style={styles.iconButton} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      {title ? (
        <Text style={[styles.title, { color: textColor }, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={styles.flexOne} />
      )}

      {rightIcon ? (
        <TouchableOpacity style={styles.iconButton} onPress={onRightPress} activeOpacity={0.7}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  flexOne: {
    flex: 1,
  },
});
