import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export const SearchBar = ({
  value,
  onChangeText,
  onSubmit,
  onFilterPress,
  placeholder = 'Search...',
  style,
  autoFocus = false,
  showFilterButton = true,
  onFocus,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search-outline" size={22} color={COLORS.primary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onFocus={onFocus}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
        {value ? (
          <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {showFilterButton && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress} activeOpacity={0.8}>
          <View style={styles.filterIconCircle}>
            <Ionicons name="options-outline" size={18} color={COLORS.white} />
          </View>
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 14,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F1F5',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  clearBtn: {
    padding: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 14,
    marginLeft: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  filterIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  filterText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
