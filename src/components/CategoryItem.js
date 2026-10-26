import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export const CategoryItem = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: item.color || COLORS.primary },
        isSelected && styles.selectedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons name={item.icon} size={18} color={COLORS.white} style={styles.icon} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: COLORS.white,
    transform: [{ scale: 1.03 }],
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
